import { formatToYYYYDDMM } from "../utils/date";
import { transport } from "../config/email";
import dotenv from "dotenv";
dotenv.config();

type EmailType = {
  name: string;
  email: string;
  date: string;
  time: string;
};

export class ReservationEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    
    const formattedDate = formatToYYYYDDMM(user.date);
    
    const link = `${
      process.env.FRONTEND_URL
    }/reserva?email=${encodeURIComponent(user.email)}&date=${encodeURIComponent(
      formattedDate
    )}&time=${encodeURIComponent(user.time)}`;

    const email = await transport.sendMail({
      from: `DsBarber <${process.env.NODEMAILER_FROM}>`,
      to: user.email,
      subject: "DsBarber - Tu turno fue reservado correctamente",
      html: `
          <div style="max-width: 600px; margin: auto; padding: 24px; font-family: Arial, sans-serif; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px;">
              <h2 style="color: #111827; font-size: 22px; margin-bottom: 16px;">¡Hola ${user.name}!</h2>

            <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
                 Tu reserva ha sido <strong>confirmada</strong> con éxito.
            </p>

            <p style="font-size: 15px; color: #4b5563; margin-bottom: 24px;">
                Puedes ver los detalles completos de tu turno accediendo al siguiente enlace:
            </p>

            <a href='${link}' 
              style="display: inline-block; background-color: #1d4ed8; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 15px; font-weight: bold;">
               Ver reserva
            </a>

            <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

            <p style="font-size: 13px; color: #6b7280;">
               Si no hiciste esta reserva o tienes alguna pregunta, podés contactarnos al telefono +54 9 3512291106.
            </p>
          </div>`,
    });

    // console.log('Mensaje enviado', email.messageId)
  };
}
