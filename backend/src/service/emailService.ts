// Si tenés "esModuleInterop": true en tsconfig, podés usar:
// import SibApiV3Sdk from 'sib-api-v3-sdk';
// @ts-ignore
import SibApiV3Sdk from "sib-api-v3-sdk";

const provider = process.env.EMAIL_PROVIDER || 'brevo';
const from = process.env.EMAIL_FROM || 'DSBarber <noreply@dsbarberstudio.space>';

// --- Inicializa cliente Brevo ---
const defaultClient = (SibApiV3Sdk as any).ApiClient.instance;
if (process.env.BREVO_API_KEY) {
  defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
}
const mailApi = new (SibApiV3Sdk as any).TransactionalEmailsApi();

function parseSender(fromStr: string) {
  const m = fromStr.match(/^(.*)<(.+)>$/);
  return m ? { name: m[1].trim(), email: m[2].trim() } : { email: fromStr.trim() };
}

export type SendMailInput = {
  to: { email: string; name?: string } | Array<{ email: string; name?: string }>;
  subject: string;
  html?: string;
  text?: string;
  cc?: Array<{ email: string; name?: string }>;
  bcc?: Array<{ email: string; name?: string }>;
  replyTo?: { email: string; name?: string };
};

export async function sendMail(input: SendMailInput) {
  if (provider !== 'brevo') {
    throw new Error('EMAIL_PROVIDER distinto de "brevo" no soportado en producción.');
  }
  const to = Array.isArray(input.to) ? input.to : [input.to];

  const payload = {
    sender: parseSender(from),
    to,
    subject: input.subject,
    htmlContent: input.html,
    textContent: input.text,
    cc: input.cc,
    bcc: input.bcc,
    replyTo: input.replyTo,
  };

  try {
    const res = await mailApi.sendTransacEmail(payload as any);
    return { ok: true, data: res };
  } catch (err: any) {
    const msg = err?.response?.text || err?.message || String(err);
    console.error('[email] Brevo API error:', msg);
    return { ok: false, error: msg };
  }
}
