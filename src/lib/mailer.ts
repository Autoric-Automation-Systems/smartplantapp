import nodemailer, { type Transporter } from "nodemailer";

/**
 * Transporte de e-mail compartilhado (redefinição de senha e alarmes).
 * Sem EMAIL_USER/EMAIL_PASS configurados nada é enviado: as chamadas caem em
 * modo "dry run" e apenas registram o e-mail no log, para que o fluxo funcione
 * em desenvolvimento sem credenciais.
 */

let cached: Transporter | null = null;

export const isMailerConfigured = () =>
  Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

export const isDryRun = () =>
  process.env.EMAIL_DRY_RUN === "1" || !isMailerConfigured();

export function getTransporter(): Transporter {
  if (!cached) {
    cached = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return cached;
}

export type MailMessage = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
};

/** Envia (ou registra, em dry run) uma mensagem. Nunca lança. */
export async function sendMail(message: MailMessage): Promise<boolean> {
  const to = Array.isArray(message.to) ? message.to.join(", ") : message.to;

  if (!to) {
    console.warn("[mailer] sem destinatários, e-mail ignorado:", message.subject);
    return false;
  }

  if (isDryRun()) {
    const reason = process.env.EMAIL_DRY_RUN === "1"
      ? "EMAIL_DRY_RUN=1"
      : "EMAIL_USER/EMAIL_PASS não configurados";
    console.info(
      `[mailer] dry run (${reason})\n  to: ${to}\n  subject: ${message.subject}\n  text:\n${message.text
        .split("\n")
        .map((line) => `    ${line}`)
        .join("\n")}`
    );
    return true;
  }

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    return true;
  } catch (error) {
    console.error("[mailer] falha ao enviar e-mail:", error);
    return false;
  }
}
