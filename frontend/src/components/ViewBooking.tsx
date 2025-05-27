'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Reserva {
  client: {
    name: string;
    email: string;
    phone: string;
  };
  barber: {
    name: string;
  };
  service: {
    name: string;
    price: number;
  };
  date: string;
  time: string;
}

export default function ViewBooking() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email || !date || !time) return;

    const fetchReserva = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/booking/view?email=${email}&date=${date}&time=${time}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error');

        setReserva(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido al obtener la reserva');
        }
      }
    };

    fetchReserva();
  }, [email, date, time]);

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!reserva) return <p className="text-gray-600 text-center mt-10">Cargando reserva...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Tu reserva confirmada</h2>

      <div className="space-y-4 text-gray-800">
        <InfoRow label="👤 Nombre" value={reserva.client.name} />
        <InfoRow label="📧 Email" value={reserva.client.email} />
        <InfoRow label="📱 Teléfono" value={reserva.client.phone} />
        <InfoRow label="✂️ Barbero" value={reserva.barber.name} />
        <InfoRow label="💈 Servicio" value={reserva.service.name} />
        <InfoRow label="💵 Precio" value={`$${reserva.service.price}`} />
        <InfoRow label="📅 Fecha" value={reserva.date} />
        <InfoRow label="🕒 Hora" value={reserva.time} />
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Gracias por reservar con nosotros. ¡Te esperamos!
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
