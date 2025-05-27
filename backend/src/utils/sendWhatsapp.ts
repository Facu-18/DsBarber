import axios from 'axios';

interface WhatsAppMessage {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  barberName: string;
}

export const sendWhatsappNotification = async (data: WhatsAppMessage) => {
  const apiKey = process.env.WHATSAPP_API_KEY;
  const phoneNumber = process.env.WHATSAPP_PHONE_NUMBER;

  const message = `📅 Nueva reserva:
👤 Nombre: ${data.name}
📧 Email: ${data.email}
📱 Teléfono: ${data.phone}
💈 Barbero: ${data.barberName}
🗓️ Día: ${data.date}
🕒 Hora: ${data.time}`;

  try {
    await axios.get('https://api.callmebot.com/whatsapp.php', {
      params: {
        phone: phoneNumber,
        text: message,
        apikey: apiKey,
      },
    });
    console.log('✅ Mensaje de WhatsApp enviado con éxito');
  } catch (error) {
    console.error('❌ Error al enviar WhatsApp:', error);
  }
};

