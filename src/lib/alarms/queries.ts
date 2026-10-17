import { sql } from "@/lib/db";

/**
 * Consultas internas do motor de alarmes. Este módulo NÃO é um Server Action:
 * nada aqui é exposto como endpoint, só é usado pelo servidor (rotas de
 * ingestão e telas).
 */

export type DeviceContext = {
  device_id: string;
  device_name: string | null;
  mac: string;
  device_type: string;
  company_id: string | null;
  company_name: string | null;
  plant_name: string | null;
  area_name: string | null;
  machine_name: string | null;
};

export type AlarmConfig = {
  /** `undefined` quando vem da camada de configs (coluna anulável). */
  min?: number | null;
  max?: number | null;
  alarm?: boolean | null;
};

export async function findDeviceContext(
  deviceId: string
): Promise<DeviceContext | null> {
  const rows = await sql`
    SELECT d.id AS device_id,
           d.name AS device_name,
           d.mac,
           d.type AS device_type,
           p.idcompany AS company_id,
           c.name AS company_name,
           p.name AS plant_name,
           ar.name AS area_name,
           m.name AS machine_name
    FROM public.devices d
    LEFT JOIN public.machines m ON d.idmachine = m.id
    LEFT JOIN public.areas ar ON m.idarea = ar.id
    LEFT JOIN public.plants p ON ar.idplant = p.id
    LEFT JOIN public.companies c ON p.idcompany = c.id
    WHERE d.id = ${deviceId}
    LIMIT 1
  `;
  return (rows[0] as DeviceContext) ?? null;
}

export async function findAlarmConfig(
  deviceId: string,
  eventName: string
): Promise<AlarmConfig | null> {
  const rows = await sql`
    SELECT min, max, COALESCE(alarm, false) AS alarm
    FROM public.configs
    WHERE device_id = ${deviceId} AND event_name = ${eventName}
    ORDER BY created_at ASC
    LIMIT 1
  `;
  if (rows.length === 0) return null;
  const config = rows[0] as AlarmConfig;
  return {
    min: config.min ?? null,
    max: config.max ?? null,
    alarm: Boolean(config.alarm),
  };
}

/**
 * Última leitura JÁ REGISTRADA para o dispositivo/evento.
 *
 * A ordenação é pelo instante gravado no banco, nunca pelo timestamp enviado
 * pelo dispositivo: se o dispositivo pudesse escolher o "anterior", bastaria
 * mandar horários crescentes para que toda leitura parecesse uma transição
 * nova e o anti-spam de e-mail fosse anulado. O chamador deve executar esta
 * consulta ANTES de inserir a leitura nova.
 */
export async function findLatestEventValue(
  deviceId: string,
  eventName: string
): Promise<number | null> {
  const rows = await sql`
    SELECT value
    FROM public.events
    WHERE device_id = ${deviceId}
      AND name = ${eventName}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  if (rows.length === 0) return null;
  const parsed = Number(rows[0].value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Instante do último alarme do dispositivo/evento, usado como anti-spam. */
export async function findLastAlarmAt(
  deviceId: string,
  eventName: string
): Promise<string | null> {
  const rows = await sql`
    SELECT created_at
    FROM public.alarms
    WHERE device_id = ${deviceId} AND event_name = ${eventName}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return (rows[0]?.created_at as string) ?? null;
}

export async function insertAlarm(
  deviceId: string,
  eventName: string,
  message: string
): Promise<string | null> {
  const rows = await sql`
    INSERT INTO public.alarms (device_id, event_name, message)
    VALUES (${deviceId}, ${eventName}, ${message})
    RETURNING id
  `;
  return rows[0] ? String(rows[0].id) : null;
}

/** Destinatários: todos os usuários com e-mail da empresa do dispositivo. */
export async function findCompanyRecipients(
  companyId: string
): Promise<{ name: string | null; email: string }[]> {
  const rows = await sql`
    SELECT name, email
    FROM public.users
    WHERE idcompany = ${companyId}
      AND email IS NOT NULL
      AND email <> ''
    ORDER BY name ASC
  `;
  return rows as { name: string | null; email: string }[];
}
