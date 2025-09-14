'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getServiceById, Service } from '@/src/lib/api/getServiceById'
import Spinner from './UI/Spinner'

export default function InfoService() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service_id')
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!serviceId) return
    const fetchService = async () => {
      try {
        const data = await getServiceById(Number(serviceId))
        setService(data)
      } catch (error) {
        console.error('Error al obtener el servicio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [serviceId])

  if (loading) return <div> <Spinner/> </div>
  if (!service) return <p className="mb-4 text-red-500">Servicio no encontrado</p>

  return (
    <div className="mb-8 bg-black border border-black rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-white-900 mb-2 font-sans tracking-wide">
            {service.name}
          </h2>
          <p className="text-white text-sm sm:text-base">Precio: ${service.price}</p>
        </div>
      </div>
    </div>
  )
}
