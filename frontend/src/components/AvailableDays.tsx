'use client';

import { useEffect, useState } from 'react';
import { getAvailability, Availability } from '@/src/lib/api/getAvailability';
import {
  getUpcomingDatesForDay,
  generateTimeSlots,
  formatDate,
  filterReservedSlots,
} from '@/src/utils/date';
import { useSearchParams, useRouter } from 'next/navigation';

interface GroupedAvailability {
  [key: string]: {
    date: Date;
    isoDate: string;
    day: string;
    slots: string[];
  };
}

export default function AvailableDays() {
  const searchParams = useSearchParams();
  const barberId = Number(searchParams.get('barber_id'));
  const serviceId = searchParams.get('service_id');
  const router = useRouter();

  const [availability, setAvailability] = useState<Availability[]>([]);
  const [reservedMap, setReservedMap] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [isReservedLoaded, setIsReservedLoaded] = useState(false);

  // 1. Obtener disponibilidad
  useEffect(() => {
    if (!barberId) return;
    setLoading(true);
    getAvailability(barberId)
      .then(setAvailability)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [barberId]);

  // 2. Obtener horarios reservados
  useEffect(() => {
    const fetchReservedSlots = async () => {
      const map: Record<string, string[]> = {};

      const allDates = availability.flatMap(a =>
        getUpcomingDatesForDay(a.day).map(date => date.toISOString().split('T')[0])
      );
      const uniqueDates = [...new Set(allDates)];

      try {
        const responses = await Promise.all(
          uniqueDates.map(iso =>
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/availability/reserved-slots/${barberId}?date=${iso}`
            )
          )
        );

        const data = await Promise.all(responses.map(res => res.json()));

        uniqueDates.forEach((iso, index) => {
          map[iso] = data[index].slots || [];
        });

      } catch (error) {
        console.error('Error cargando reservas:', error);
      }

      setReservedMap(map);
      setIsReservedLoaded(true);
    };

    if (availability.length) fetchReservedSlots();
  }, [availability, barberId]);

  // 3. Agrupar disponibilidad (igual que antes)
  const groupedAvailability: GroupedAvailability = availability.reduce((acc, a) => {
    const upcomingDates = getUpcomingDatesForDay(a.day);

    upcomingDates.forEach((date) => {
      const formattedDate = formatDate(date);
      const isoDate = date.toISOString().split('T')[0];

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date,
          isoDate,
          day: a.day,
          slots: [],
        };
      }

      const fullSlots = generateTimeSlots(a.start_time, a.end_time);
      const reservedSlots = reservedMap[isoDate] || [];
      const available = filterReservedSlots(fullSlots, reservedSlots);

      acc[formattedDate].slots.push(...available);
    });

    return acc;
  }, {} as GroupedAvailability);

  const availabilityEntries = Object.entries(groupedAvailability).map(([formattedDate, data]) => ({
    formattedDate,
    ...data,
  }));

  if (loading || !isReservedLoaded) {
    return <p className="text-gray-600 text-center text-lg font-medium animate-pulse">Cargando turnos...</p>;
  }

  if (!availabilityEntries.length) {
    return <p className="text-gray-600 text-center text-lg font-medium">No hay días disponibles.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-700">
        <span className="text-blue-900 font-semibold">1. Fecha y hora</span>
        <span>2. Profesional</span>
        <span>3. Datos de contacto</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-sans tracking-tight">
        Seleccioná un día y turno
      </h2>

      <div className="space-y-6">
        {availabilityEntries.map((entry) => (
          <div key={entry.formattedDate} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {entry.day}, {entry.formattedDate}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {entry.slots.map((slot) => (
                <button
                  key={slot}
                  className="py-2 px-3 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 shadow-sm"
                  onClick={() =>
                    router.push(
                      `/reservar/contacto?service_id=${serviceId}&barber_id=${barberId}&date=${entry.isoDate}&time=${slot}`
                    )
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}