'use client'

import { useSearchParams } from 'next/navigation'
import DisableSlotManager from '@/src/components/DisableSlotsManager'

export default function BarberSlotPageClient() {
  const searchParams = useSearchParams()
  const barberId = Number(searchParams.get('barber_id'))
  const adminKey = searchParams.get('admin_key')

  if (!barberId) return <p className="text-red-600">Barbero no encontrado en los parámetros.</p>

  return <DisableSlotManager barberId={barberId} adminKey={adminKey!} />
}
