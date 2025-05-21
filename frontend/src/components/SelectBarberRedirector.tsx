'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Barber } from '@/src/lib/api/getBarbres'

export default function SelectBarberRedirector() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${baseUrl}/barber/barbers`)
        const data = await res.json()
        setBarbers(data)
      } catch (error) {
        console.error('Error al cargar barberos:', error)
      }
    }

    fetchBarbers()
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const barberId = e.target.value
    if (barberId) {
      router.push(`/admin-panel-ds/horarios/gestionar?barber_id=${barberId}`)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <label className="block text-sm font-medium mb-2">Seleccioná un barbero</label>
      <select
        className="w-full border px-3 py-2 rounded shadow"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          -- Elegí un barbero --
        </option>
        {barbers.map((barber) => (
          <option key={barber.barber_id} value={barber.barber_id}>
            {barber.name}
          </option> 
        ))}
      </select>
    </div>
  )
}
