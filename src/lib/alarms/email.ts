import type { DeviceContext } from "./queries";
import type { MailMessage } from "@/lib/mailer";

export type Severity = "critical" | "high" | "medium";

export type AlarmSender = {
  context: DeviceContext;
  eventName: string;
  value: number;
  min: number | null;
  max: number | null;
  message: string;
  severity: Severity;
  at: Date;
  alarmUrl: string;
};

/**
 * Severidade derivada do quanto o valor passou do limite, relativo à largura
 * da faixa configurada (a tabela de alarmes não tem coluna de severidade).
 */
export function computeSeverity(
  value: number,
  min: number | null,
  max: number | null
): Severity {
  const limit = value < (min ?? -Infinity) ? min : max;
  const range =
    min != null && max != null && max > min ? max - min : Math.abs(limit ?? 1) || 1;
  const deviation = Math.abs(value - (limit ?? value)) / range;

  if (deviation >= 0.2) return "critical";
  if (deviation >= 0.1) return "high";
  return "medium";
}

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Crítico",
  high: "Alto",
  medium: "Médio",
};

const SEVERITY_COLOR: Record<Severity, { bg: string; text: string; bar: string }> = {
  critical: { bg: "#fef3f2", text: "#b42318", bar: "#f04438" },
  high: { bg: "#fffaeb", text: "#b54708", bar: "#f79009" },
  medium: { bg: "#eff8ff", text: "#175cd3", bar: "#0ba5ec" },
};

export const EVENT_LABELS: Record<string, string> = {
  temperature: "Temperatura",
  humidity: "Umidade",
  flow: "Vazão",
  level: "Nível",
  counter: "Contador",
  battery: "Bateria",
  wifi: "Sinal Wi-Fi",
  count: "Contagem",
  event1: "Evento 1",
  event2: "Evento 2",
  event3: "Evento 3",
};

export const eventLabel = (name: string) =>
  EVENT_LABELS[name] ??
  name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");

const direction = (value: number, min: number | null, max: number | null) =>
  min != null && value < min ? "abaixo do mínimo" : "acima do máximo";

/** Escapa texto de origem variável antes de entrar no HTML do e-mail. */
const escapeHtml = (value: string | number | null | undefined) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatNumber = (value: number) =>
  Number.isInteger(value)
    ? String(value)
    : value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

const formatDate = (date: Date) =>
  date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const location = (context: DeviceContext) =>
  [context.plant_name, context.area_name, context.machine_name]
    .filter(Boolean)
    .join(" › ");

export function buildAlarmEmail(alarm: AlarmSender): MailMessage {
  const { context, eventName, value, min, max, severity, at, alarmUrl } = alarm;
  const label = eventLabel(eventName);
  const device = context.device_name || context.mac;
  const color = SEVERITY_COLOR[severity];
  const limits =
    min != null && max != null
      ? `${formatNumber(min)} a ${formatNumber(max)}`
      : min != null
        ? `mínimo ${formatNumber(min)}`
        : `máximo ${formatNumber(max!)}`;

  const subject = `[Smart Plant] Alarme ${SEVERITY_LABEL[severity]}: ${label} ${direction(value, min, max)} — ${device}`;

  const rows: [string, string][] = [
    ["Empresa", context.company_name || "—"],
    ["Local", location(context) || "—"],
    ["Dispositivo", `${device} (${context.device_type})`],
    ["MAC", context.mac],
    ["Evento", label],
    ["Valor lido", `${formatNumber(value)}`],
    ["Faixa configurada", limits],
    ["Severidade", SEVERITY_LABEL[severity]],
    ["Data", formatDate(at)],
  ];

  const text = [
    `Alarme Smart Plant — ${SEVERITY_LABEL[severity]}`,
    "",
    `${label} ${direction(value, min, max)}: valor lido ${formatNumber(value)} (faixa ${limits}).`,
    "",
    ...rows.map(([term, val]) => `${term}: ${val}`),
    "",
    `Ver alarmes: ${alarmUrl}`,
    "",
    "Você recebe este e-mail porque o alarme está habilitado nas configurações deste evento.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#101828;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e7ec;">
      <tr>
        <td style="padding:20px 24px;border-bottom:1px solid #e4e7ec;">
          <span style="font-size:16px;font-weight:bold;color:#465fff;">Smart Plant</span>
          <span style="float:right;font-size:12px;color:#667085;">${escapeHtml(context.company_name || "")}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px 0;">
          <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${color.bg};color:${color.text};font-size:12px;font-weight:bold;text-transform:uppercase;">
            ${SEVERITY_LABEL[severity]}
          </span>
          <h1 style="margin:12px 0 4px;font-size:18px;line-height:1.4;">${escapeHtml(label)} ${direction(value, min, max)}</h1>
          <p style="margin:0;font-size:14px;color:#475467;">
            Valor lido <strong>${formatNumber(value)}</strong> · faixa configurada <strong>${limits}</strong>
          </p>
          <div style="height:4px;border-radius:2px;background:${color.bar};margin:16px 0 4px;"></div>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 24px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
            ${rows
              .map(
                ([term, val]) => `<tr>
              <td style="padding:6px 0;color:#667085;width:40%;">${escapeHtml(term)}</td>
              <td style="padding:6px 0;color:#101828;font-weight:bold;">${escapeHtml(val)}</td>
            </tr>`
              )
              .join("")}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px 24px;">
          <a href="${escapeHtml(alarmUrl)}" style="display:inline-block;background:#465fff;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:bold;">
            Ver alarmes
          </a>
          <p style="margin:16px 0 0;font-size:12px;color:#98a2b3;">
            Você recebe este e-mail porque o alarme está habilitado nas configurações deste evento.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { to: [], subject, html, text };
}
