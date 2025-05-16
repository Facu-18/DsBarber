'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getServiceById, Service } from '@/src/lib/api/getServiceById'

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

  if (loading) return <p className="mb-4">Cargando servicio...</p>
  if (!service) return <p className="mb-4 text-red-500">Servicio no encontrado</p>

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 font-sans tracking-wide">
        {service.name}
      </h2>
      <p className="text-gray-600 text-sm">Precio: ${service.price}</p>
    </div>
  )
}
