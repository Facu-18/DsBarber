import { transport } from "../config/email";

type EmailType = {
  name: string;
  email: string;
};

export class ReservationEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "DsBarber <dsbarber@shop.com>",
      to: user.email,
      subject: "DsBarber - Tu turno fue reservado correctamente",
      html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; margin-bottom: 10px;">
                ¡Hola ${user.name}!
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.5; margin-bottom: 20px;">
                Tu reserva fue realizada con éxito. Puedes ver más información sobre tu turno visitando el siguiente enlace:
            </p>
            <a href='' style="font-family: Arial, sans-serif; font-size: 14px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Ver reserva
            </a>`,
    });

    // console.log('Mensaje enviado', email.messageId)
  };
}
