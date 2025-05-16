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
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center font-sans tracking-tight">
        Elegí un barbero
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 text-left text-gray-700 font-semibold text-sm tracking-wide">Foto</th>
              <th className="py-4 px-6 text-left text-gray-700 font-semibold text-sm tracking-wide">Nombre</th>
              <th className="py-4 px-6 text-left text-gray-700 font-semibold text-sm tracking-wide">Descripción</th>
              <th className="py-4 px-6 text-left text-gray-700 font-semibold text-sm tracking-wide">Acción</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber) => (
              <tr
                key={barber.barber_id}
                className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
              >
                <td className="py-4 px-6">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </td>
                <td className="py-4 px-6">
                  <h2 className="text-xl font-semibold text-blue-900 font-sans tracking-wide">
                    {barber.name}
                  </h2>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-600 line-clamp-2">{barber.description}</p>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="w-full max-w-xs bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                    onClick={() =>
                      router.push(`/reservar/turnos?service_id=${serviceId}&barber_id=${barber.barber_id}`)
                    }
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}