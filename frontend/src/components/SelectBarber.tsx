"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Barber, getBarbers } from "@/src/lib/api/getBarbres";
import Image from "next/image";

export default function SelectBarber() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");
  const router = useRouter();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch (err) {
        console.error("Error al obtener barberos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  if (!serviceId) {
    return (
      <p className="text-red-500 text-center text-lg font-medium">
        No se proporcionó un servicio.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-gray-600 text-center text-lg font-medium animate-pulse">
        Cargando barberos...
      </p>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center tracking-tight">
        Elegí tu barbero
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {barbers.map((barber) => (
          <div
            key={barber.barber_id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Imagen */}
            <div className="relative w-full h-56 sm:h-64">
              <Image
                src={barber.image}
                alt={barber.name}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* Nombre */}
              <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white tracking-wide drop-shadow-lg">
                {barber.name}
              </h2>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-1">
              <p className="text-sm text-gray-600 mb-5 line-clamp-3">
                {barber.description}
              </p>

              <button
                className="mt-auto w-full bg-black text-white py-2.5 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-sm sm:text-base font-medium"
                onClick={() =>
                  router.push(
                    `/reservar/turnos?service_id=${serviceId}&barber_id=${barber.barber_id}`
                  )
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
