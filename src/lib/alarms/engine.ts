import { sendMail } from "@/lib/mailer";
import {
  findAlarmConfig,
  findCompanyRecipients,
  findDeviceContext,
  findLastAlarmAt,
  findLatestEventValue,
  insertAlarm,
  type AlarmConfig,
} from "./queries";
import { buildAlarmEmail, computeSeverity, eventLabel } from "./email";

export type AlarmStatus = "ok" | "below" | "above";

export type ReadingEvaluation = {
  eventName: string;
  value: number;
  status: AlarmStatus | "ignored";
  /** Motivo quando nada foi registrado (sem config, alarme desligado, etc.). */
  reason?: string;
  alarmId?: string | null;
  notified?: boolean;
  recipients?: string[];
};

const EMAIL_ENABLED = () => process.env.ALARM_EMAIL_ENABLED !== "0";

const MIN_INTERVAL_MINUTES = () =>
  Number(process.env.ALARM_EMAIL_MIN_INTERVAL_MINUTES ?? 15);

const extraRecipients = () =>
  (process.env.ALARM_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

function statusOf(
  value: number,
  min: number | null,
  max: number | null
): AlarmStatus {
  if (min != null && value < min) return "below";
  if (max != null && value > max) return "above";
  return "ok";
}

function messageFor(
  eventName: string,
  value: number,
  status: AlarmStatus,
  min: number | null,
  max: number | null
) {
  const label = eventLabel(eventName);
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

  return status === "below"
    ? `${label} abaixo do mínimo: valor ${formatted} (mínimo ${min})`
    : `${label} acima do máximo: valor ${formatted} (máximo ${max})`;
}

/**
 * Avalia uma leitura contra os limites configurados para o evento do módulo.
 *
 * Só registra alarme na TRANSIÇÃO para fora da faixa: enquanto o valor
 * continuar fora, nenhuma linha nova é criada (mesma lógica de histerese usada
 * por sistemas de supervisão). O retorno à faixa não gera registro, porque a
 * tabela `alarms` não tem coluna de status — o histórico de violações é o que
 * fica disponível para auditoria.
 *
 * O e-mail é enviado quando o alarme é criado, respeitando
 * ALARM_EMAIL_MIN_INTERVAL_MINUTES para não disparar e-mails repetidos em caso
 * de oscilação do sensor.
 */
export async function evaluateReading({
  deviceId,
  eventName,
  value,
  at = new Date(),
  config: providedConfig,
  previousValue,
}: {
  deviceId: string;
  eventName: string;
  value: number;
  at?: Date;
  /** Config já carregada pelo chamador, evita uma query por leitura. */
  config?: AlarmConfig | null;
  /**
   * Leitura anterior já registrada, lida pelo chamador ANTES de inserir a
   * atual. Quando omitida, é consultada aqui (o banco ordena pelo instante
   * gravado, nunca pelo timestamp do dispositivo).
   */
  previousValue?: number | null;
}): Promise<ReadingEvaluation> {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return { eventName, value: numericValue, status: "ignored", reason: "invalid-value" };
  }

  const config =
    providedConfig !== undefined
      ? providedConfig
      : await findAlarmConfig(deviceId, eventName);
  if (!config) {
    return { eventName, value: numericValue, status: "ignored", reason: "no-config" };
  }
  if (!config.alarm) {
    return { eventName, value: numericValue, status: "ignored", reason: "alarm-disabled" };
  }
  const min = config.min ?? null;
  const max = config.max ?? null;
  if (min == null && max == null) {
    return { eventName, value: numericValue, status: "ignored", reason: "no-limits" };
  }

  const status = statusOf(numericValue, min, max);
  if (status === "ok") {
    return { eventName, value: numericValue, status: "ok" };
  }

  const previous =
    previousValue !== undefined
      ? previousValue
      : await findLatestEventValue(deviceId, eventName);
  const previousStatus =
    previous === null ? null : statusOf(previous, min, max);

  // Já estava fora da faixa na leitura anterior: alarme continua ativo.
  if (previousStatus === status) {
    return { eventName, value: numericValue, status, reason: "already-active" };
  }

  const lastAlarmAt = await findLastAlarmAt(deviceId, eventName);
  const message = messageFor(eventName, numericValue, status, min, max);
  const alarmId = await insertAlarm(deviceId, eventName, message);

  const evaluation: ReadingEvaluation = {
    eventName,
    value: numericValue,
    status,
    alarmId,
  };

  if (!EMAIL_ENABLED()) {
    evaluation.reason = "email-disabled";
    return evaluation;
  }

  // O intervalo é medido com o relógio do SERVIDOR: usar o horário enviado
  // pelo dispositivo permitiria anular o anti-spam com timestamps futuros.
  const intervalMs = MIN_INTERVAL_MINUTES() * 60_000;
  const serverNow = Date.now();
  if (
    lastAlarmAt &&
    serverNow - new Date(lastAlarmAt).getTime() < intervalMs
  ) {
    evaluation.reason = "email-throttled";
    return evaluation;
  }

  const context = await findDeviceContext(deviceId);
  if (!context) {
    evaluation.reason = "device-not-found";
    return evaluation;
  }

  const recipients = extraRecipients();
  if (recipients.length === 0) {
    if (!context.company_id) {
      evaluation.reason = "no-recipients";
      return evaluation;
    }
    const companyUsers = await findCompanyRecipients(context.company_id);
    recipients.push(...companyUsers.map((user) => user.email));
  }

  if (recipients.length === 0) {
    evaluation.reason = "no-recipients";
    return evaluation;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const mail = buildAlarmEmail({
    context,
    eventName,
    value: numericValue,
    min,
    max,
    message,
    severity: computeSeverity(numericValue, min, max),
    at,
    alarmUrl: `${baseUrl}/alarms`,
  });

  const sent = await sendMail({ ...mail, to: recipients });
  evaluation.notified = sent;
  evaluation.recipients = recipients;
  return evaluation;
}
