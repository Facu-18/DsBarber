import dotenv from "dotenv";
dotenv.config();

import { sendMail } from "../service/emailService";

type EmailType = {
  name: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string;
};

export class ReservationEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    // ⚠️ NO formatear la fecha: ya está en YYYY-MM-DD
    const link = `${process.env.FRONTEND_URL}/reserva?email=${encodeURIComponent(
      user.email
    )}&date=${user.date}&time=${encodeURIComponent(user.time)}`;

    const html = `
      <div style="max-width: 600px; margin: auto; padding: 24px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px;">
        <h2 style="color: #111827; font-size: 22px; margin-bottom: 16px;">¡Hola ${user.name}!</h2>

        <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
          Tu reserva ha sido <strong>confirmada</strong> con éxito.
        </p>

        <p style="font-size: 15px; color: #4b5563; margin-bottom: 24px;">
          Podés ver los detalles completos de tu turno accediendo al siguiente enlace:
        </p>

        <a href='${link}'
          style="display: inline-block; background-color: #1d4ed8; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 15px; font-weight: bold;">
          Ver reserva
        </a>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 13px; color: #6b7280;">
          Si no hiciste esta reserva o tenés alguna pregunta, podés contactarnos al teléfono +54 9 3512291106.
        </p>
      </div>
    `;

    // Envío por Brevo API (HTTPS 443) — no usa SMTP
    const email = await sendMail({
      to: { email: user.email, name: user.name },
      subject: "DsBarber - Tu turno fue reservado correctamente",
      html,
    });

    return email;
  };
}
