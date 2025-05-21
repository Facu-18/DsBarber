'use client'

import DisableSlotManager from '@/src/components/DisableSlotsManager'
import { useSearchParams } from 'next/navigation'


export default function AdminPage() {
  const searchParams = useSearchParams()
  const barberId = Number(searchParams.get('barber_id'))

  if (!barberId) return <p className="text-red-600">Barbero no encontrado en los parámetros.</p>

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <DisableSlotManager barberId={barberId} />
    </div>
  )
}
