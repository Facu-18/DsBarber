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
        <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center font-sans tracking-wide">
                Selecciona tu servicio
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <li
                        key={service.service_id}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
                    >
                        <h2 className="text-xl font-semibold text-blue-900 mb-2 font-sans tracking-wide">
                            {service.name}
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">${service.price}</p>
                        <Link
                            href={`/reservar/barberos?service_id=${service.service_id}`}
                            className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                        >
                            Seleccionar
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}