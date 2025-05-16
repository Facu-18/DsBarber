import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Barber, getBarbers } from '@/src/lib/api/getBarbres';

export default function SelectBarber() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service_id');
  const router = useRouter();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch (err) {
        console.error('Error al obtener barberos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  if (!serviceId) return <p className="text-red-500 text-center text-lg font-medium">No se proporcionó un servicio.</p>;
  if (loading) return <p className="text-gray-600 text-center text-lg font-medium animate-pulse">Cargando barberos...</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 text-center font-sans tracking-tight">
        Elegí tu barbero
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {barbers.map((barber) => (
          <div
            key={barber.barber_id}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative">
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <h2 className="absolute bottom-4 left-4 text-lg sm:text-xl font-semibold text-white font-sans tracking-wide">
                {barber.name}
              </h2>
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <p className="text-sm text-gray-600 mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3">
                {barber.description}
              </p>
              <button
                className="mt-auto w-full bg-blue-600 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base font-medium"
                onClick={() =>
                  router.push(`/reservar/turnos?service_id=${serviceId}&barber_id=${barber.barber_id}`)
                }
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}