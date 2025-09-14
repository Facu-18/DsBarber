'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Barber } from '@/src/lib/api/getBarbres'

export default function SelectBarberRedirector() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const adminKey = searchParams.get('admin_key')

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
      router.push(`/admin-panel-ds/horarios/gestionar?barber_id=${barberId}&admin_key=${adminKey}`)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-5 text-white">
        <label
          htmlFor="barber-select"
          className="block text-sm font-medium mb-2 text-white/90"
        >
          Seleccioná un barbero
        </label>

        <div className="relative">
          <select
            id="barber-select"
            className="w-full appearance-none rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 pr-10 text-white outline-none focus:ring-2 focus:ring-white/30"
            onChange={handleSelect}
            defaultValue=""
          >
            <option value="" disabled>
              -- Elegí un barbero --
            </option>
            {barbers.map((barber) => (
              <option key={barber.barber_id} value={barber.barber_id} className="text-black">
                {barber.name}
              </option>
            ))}
          </select>

          {/* Chevron decorativo del select */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
