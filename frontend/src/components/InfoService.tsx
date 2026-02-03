'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getServiceById, Service } from '@/src/lib/api/getServiceById'
import Spinner from './UI/Spinner'

export default function InfoService() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service_id')
  const barberId = searchParams.get('barber_id')
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (!serviceId) return
    const fetchService = async () => {
      try {
        const parsedBarberId = barberId ? Number(barberId) : undefined
        const data = await getServiceById(Number(serviceId), parsedBarberId)
        setService(data)
      } catch (error) {
        console.error('Error al obtener el servicio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [serviceId, barberId])

  if (loading) return <div> <Spinner/> </div>
  if (!service) return <p className="mb-4 text-red-500">Servicio no encontrado</p>

  // Mostrar solo 80 caracteres de la descripción
  const shortDescription =
    service.description && service.description.length > 80
      ? service.description.slice(0, 80) + '...'
      : service.description

  return (
    <div className="mb-8 bg-black border border-black rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 font-sans tracking-wide">
            {service.name}
          </h2>

          <p className="text-white text-sm sm:text-base mb-2">
            Precio: ${service.price}
          </p>

          {/* Descripción colapsable */}
          {service.description && (
            <div className="text-white text-sm leading-relaxed">
              {showMore ? service.description : shortDescription}

              {service.description.length > 80 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {showMore ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
