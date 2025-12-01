import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getServices } from '@/src/lib/api/getServices'
import { type Service } from '@/src/lib/api/getServices'
import Spinner from './UI/Spinner'

export default function SelectService() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (err) {
        console.error('Error al obtener servicios:', err)
        setError('No se pudieron cargar los servicios.')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  if (loading) return <Spinner />
  if (error) return <p className="text-red-500">{error}</p>

  const toggle = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center font-sans tracking-tight">
        Seleccioná tu servicio
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map(service => {
          const isExpanded = expanded[service.service_id] || false
          const shortDescription =
            service.description && service.description.length > 80
              ? service.description.slice(0, 80) + '...'
              : service.description

          return (
            <li
              key={service.service_id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
            >
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Nombre + precio simple */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 font-sans tracking-wide">
                    {service.name}
                  </h2>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
                    ${service.price}
                  </span>
                </div>

                {/* Descripción colapsable */}
                {service.description && (
                  <div className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {isExpanded ? service.description : shortDescription}

                    {service.description.length > 80 && (
                      <button
                        onClick={() => toggle(service.service_id)}
                        className="ml-1 text-blue-600 hover:text-blue-500 font-medium transition-colors text-xs sm:text-sm"
                      >
                        {isExpanded ? 'Ver menos' : 'Ver más'}
                      </button>
                    )}
                  </div>
                )}

                <Link
                  href={`/reservar/barberos?service_id=${service.service_id}`}
                  className="mt-auto w-full text-center bg-black text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Seleccionar
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
