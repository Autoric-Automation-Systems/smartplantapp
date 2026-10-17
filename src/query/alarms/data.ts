import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/utils';
import { EVENT_LABELS } from '@/lib/alarms/email';

/** Converte um termo de busca no nome tecnico do evento ("Temperatura"). */
function eventNameFromSearch(search: string | null): string | null {
  if (!search) return null;
  const term = search.trim().toLowerCase();
  const found = Object.entries(EVENT_LABELS).find(
    ([, label]) => label.toLowerCase() === term || label.toLowerCase().includes(term)
  );
  return found ? found[0] : null;
}
import {
  ALARMS_PAGE_SIZE,
  type Alarm,
  type AlarmFilters,
  type AlarmRow,
  type AlarmsSummary,
} from './definitions';

export async function fetchDataAllAlarms(page = 1, limit = 50) {
  const currentCompanyId = await CurrentCompanyId();
  const offset = (page - 1) * limit;

  try {
    const data = await sql`
      SELECT a.id, a.device_id, a.message, a.created_at, a.readed, a.event_name
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${currentCompanyId}
      ORDER BY a.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const alarms = data;
    return alarms as Alarm[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}

export async function fetchRecentAlarms() {
  const currentCompanyId = await CurrentCompanyId();
  try {
    const data = await sql`
            SELECT a.id, a.device_id, a.message, a.created_at, a.readed, a.event_name
            FROM public.alarms a
            JOIN public.devices d ON a.device_id = d.id
            JOIN public.machines m ON d.idmachine = m.id
            JOIN public.areas ar ON m.idarea = ar.id
            JOIN public.plants p ON ar.idplant = p.id
            WHERE p.idcompany = ${currentCompanyId}
            ORDER BY a.created_at DESC
            LIMIT 10
        `;
    const alarms = data;
    return alarms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch recent alarms.');
  }
}

/** Período → data de corte (null = sem corte). */
function periodStart(period: AlarmFilters["period"]): Date | null {
  const now = Date.now();
  switch (period) {
    case "24h":
      return new Date(now - 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now - 30 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

/**
 * Lista paginada com filtro no banco (a tela antes carregava tudo e filtrava no
 * cliente). Os limites configurados entram por subconsulta para não
 * multiplicar linhas quando há mais de uma config por evento.
 */
export async function fetchAlarmsPage(
  filters: AlarmFilters,
  page = 1,
  limit = ALARMS_PAGE_SIZE
): Promise<{ rows: AlarmRow[]; total: number }> {
  const idcompany = await CurrentCompanyId();
  const offset = (page - 1) * limit;
  const start = periodStart(filters.period);
  const readFilter =
    filters.status === "unread" ? false : filters.status === "read" ? true : null;
  const search = filters.search ? `%${filters.search}%` : null;
  const searchEventName = eventNameFromSearch(filters.search);

  try {
    const rows = await sql`
      SELECT a.id, a.device_id, a.event_name, a.message, a.readed, a.created_at,
             d.name AS device_name, d.mac AS device_mac, d.type AS device_type,
             m.name AS machine_name, ar.name AS area_name, p.name AS plant_name,
             (SELECT c.min FROM public.configs c
               WHERE c.device_id = a.device_id AND c.event_name = a.event_name
               ORDER BY c.created_at ASC LIMIT 1) AS config_min,
             (SELECT c.max FROM public.configs c
               WHERE c.device_id = a.device_id AND c.event_name = a.event_name
               ORDER BY c.created_at ASC LIMIT 1) AS config_max
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      LEFT JOIN public.machines m ON d.idmachine = m.id
      LEFT JOIN public.areas ar ON m.idarea = ar.id
      LEFT JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
        AND (${readFilter}::boolean IS NULL OR a.readed = ${readFilter}::boolean)
        AND (${filters.event}::text IS NULL OR a.event_name = ${filters.event}::text)
        AND (${filters.device}::text IS NULL OR a.device_id = ${filters.device}::uuid)
        AND (${start}::timestamptz IS NULL OR a.created_at >= ${start}::timestamptz)
        AND (${search}::text IS NULL
             OR a.message ILIKE ${search}::text
             OR d.name ILIKE ${search}::text
             OR a.event_name = ${searchEventName}::text)
      ORDER BY a.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const count = await sql`
      SELECT COUNT(*)::int AS total
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      LEFT JOIN public.machines m ON d.idmachine = m.id
      LEFT JOIN public.areas ar ON m.idarea = ar.id
      LEFT JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
        AND (${readFilter}::boolean IS NULL OR a.readed = ${readFilter}::boolean)
        AND (${filters.event}::text IS NULL OR a.event_name = ${filters.event}::text)
        AND (${filters.device}::text IS NULL OR a.device_id = ${filters.device}::uuid)
        AND (${start}::timestamptz IS NULL OR a.created_at >= ${start}::timestamptz)
        AND (${search}::text IS NULL
             OR a.message ILIKE ${search}::text
             OR d.name ILIKE ${search}::text
             OR a.event_name = ${searchEventName}::text)
    `;

    return { rows: rows as AlarmRow[], total: Number(count[0]?.total ?? 0) };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch alarms.');
  }
}

/** Indicadores do topo da tela (sempre sobre a empresa inteira). */
export async function fetchAlarmsSummary(): Promise<AlarmsSummary> {
  const idcompany = await CurrentCompanyId();
  try {
    const totals = await sql`
      SELECT COUNT(*)::int AS total,
             COUNT(*) FILTER (WHERE a.readed = false)::int AS unread,
             COUNT(*) FILTER (WHERE a.created_at >= now() - interval '24 hours')::int AS last24h
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
    `;

    const byEvent = await sql`
      SELECT a.event_name,
             COUNT(*)::int AS total,
             COUNT(*) FILTER (WHERE a.readed = false)::int AS unread
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
      GROUP BY a.event_name
      ORDER BY total DESC
    `;

    const byDevice = await sql`
      SELECT a.device_id, d.name AS device_name,
             COUNT(*)::int AS total,
             COUNT(*) FILTER (WHERE a.readed = false)::int AS unread
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
      GROUP BY a.device_id, d.name
      ORDER BY total DESC
      LIMIT 8
    `;

    return {
      total: Number(totals[0]?.total ?? 0),
      unread: Number(totals[0]?.unread ?? 0),
      last24h: Number(totals[0]?.last24h ?? 0),
      byEvent: byEvent as AlarmsSummary["byEvent"],
      byDevice: byDevice as AlarmsSummary["byDevice"],
    };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch alarms summary.');
  }
}

/** Opções dos filtros, restritas aos alarmes existentes da empresa. */
export async function fetchAlarmFilterOptions(): Promise<{
  events: string[];
  devices: { id: string; name: string | null }[];
}> {
  const idcompany = await CurrentCompanyId();
  try {
    const events = await sql`
      SELECT DISTINCT a.event_name
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
      ORDER BY a.event_name ASC
    `;

    const devices = await sql`
      SELECT DISTINCT d.id, d.name
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
      ORDER BY d.name ASC
    `;

    return {
      events: events.map((row) => row.event_name as string),
      devices: devices as { id: string; name: string | null }[],
    };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch alarm filter options.');
  }
}

/** Leituras recentes do evento, para dar contexto no detalhe do alarme. */
export async function fetchAlarmContext(
  deviceId: string,
  eventName: string,
  limit = 12
): Promise<{ value: string | null; created_at: string }[]> {
  const idcompany = await CurrentCompanyId();
  try {
    const rows = await sql`
      SELECT e.value, e.created_at
      FROM public.events e
      JOIN public.devices d ON e.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${idcompany}
        AND e.device_id = ${deviceId}
        AND e.name = ${eventName}
      ORDER BY e.created_at DESC
      LIMIT ${limit}
    `;
    return rows as { value: string | null; created_at: string }[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch alarm context.');
  }
}
