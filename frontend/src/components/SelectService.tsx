import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getServices } from '@/src/lib/api/getServices'
import { type Service } from '@/src/lib/api/getServices'
import Spinner from './UI/Spinner'

export default function SelectService() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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


    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center font-sans tracking-tight">
        Seleccioná tu servicio
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service) => (
          <li
            key={service.service_id}
            className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-sans tracking-wide">
                  {service.name}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4 sm:mb-5">Precio: ${service.price}</p>
              <Link
                href={`/reservar/barberos?service_id=${service.service_id}`}
                className="mt-auto w-full text-center bg-black text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium text-sm sm:text-base"
              >
                Seleccionar
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )
}