'use client'

import { useEffect, useState } from 'react'
import { getAvailability, Availability } from '@/src/lib/api/getAvailability'
import {
  getUpcomingDatesForDay,
  generateTimeSlots,
  formatDate,
  filterReservedSlots,
} from '@/src/utils/date'
import { useSearchParams, useRouter } from 'next/navigation'
import Spinner from './UI/Spinner'

interface GroupedAvailability {
  [key: string]: {
    date: Date
    isoDate: string
    day: string
    slots: string[]
  }
}

interface DisabledSlot {
  date: string
  time: string
}

export default function AvailableDays() {
  const searchParams = useSearchParams()
  const barberId = Number(searchParams.get('barber_id'))
  const serviceId = searchParams.get('service_id')
  const router = useRouter()

  const [availability, setAvailability] = useState<Availability[]>([])
  const [reservedMap, setReservedMap] = useState<Record<string, string[]>>({})
  const [disabledSlots, setDisabledSlots] = useState<DisabledSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [isReservedLoaded, setIsReservedLoaded] = useState(false)

  useEffect(() => {
    if (!barberId) return
    setLoading(true)
    getAvailability(barberId)
      .then((data) => {
        setAvailability(data)
        if (data.length === 0) setIsReservedLoaded(true)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [barberId])

  useEffect(() => {
    const fetchReservedSlots = async () => {
      const map: Record<string, string[]> = {}
      const allDates = availability.flatMap((a) =>
        getUpcomingDatesForDay(a.day).map((date) => date.toISOString().split('T')[0])
      )
      const uniqueDates = [...new Set(allDates)]

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const responses = await Promise.all(
          uniqueDates.map((iso) =>
            fetch(`${baseUrl}/availability/reserved-slots/${barberId}?date=${iso}`)
          )
        )

        const data = await Promise.all(responses.map((res) => res.json()))

        uniqueDates.forEach((iso, index) => {
          map[iso] = data[index].slots || []
        })
      } catch (error) {
        console.error('Error cargando reservas:', error)
      }

      setReservedMap(map)
      setIsReservedLoaded(true)
    }

    if (availability.length) fetchReservedSlots()
  }, [availability, barberId])

  useEffect(() => {
    const fetchDisabledSlots = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${baseUrl}/disabled/${barberId}`)
        const json = await res.json()
        setDisabledSlots(Array.isArray(json.slots) ? json.slots : [])
      } catch (error) {
        console.error('Error cargando slots deshabilitados:', error)
      }
    }

    if (barberId) fetchDisabledSlots()
  }, [barberId])

  const groupedAvailability: GroupedAvailability = availability.reduce((acc, a) => {
    const upcomingDates = getUpcomingDatesForDay(a.day)

    upcomingDates.forEach((date) => {
      const formattedDate = formatDate(date)
      const isoDate = date.toISOString().split('T')[0]
      const dayNum = date.getDay()

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date,
          isoDate,
          day: a.day,
          slots: [],
        }
      }

      let fullSlots: string[] = []
      if (dayNum >= 2 && dayNum <= 5) {
        // Martes a Viernes
        fullSlots = [
          ...generateTimeSlots('10:00', '13:00', 45, date),
          ...generateTimeSlots('16:00', '21:00', 45, date),
        ]
      } else if (dayNum === 6) {
        // Sábado
        fullSlots = generateTimeSlots('10:00', '17:00', 45, date)
      }

      const reservedSlots = reservedMap[isoDate] || []
      const available = filterReservedSlots(fullSlots, reservedSlots)

      const finalSlots = available.filter(
        (slot) => !disabledSlots.some((d) => d.date === isoDate && d.time === slot)
      )

      acc[formattedDate].slots = Array.from(new Set([...acc[formattedDate].slots, ...finalSlots]));

    })

    return acc
  }, {} as GroupedAvailability)

  const availabilityEntries = Object.entries(groupedAvailability)
    .map(([formattedDate, data]) => ({ formattedDate, ...data }))
    .filter((entry) => entry.slots.length > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  if (loading || !isReservedLoaded) {
    return (
      <div className="py-10 flex justify-center">
        <Spinner />
      </div>
    )
  }

  if (!availability.length || availabilityEntries.length === 0) {
    return (
      <div className="text-center text-black-600 text-lg font-medium py-10">
        No hay turnos disponibles.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-sans tracking-tight">
        Seleccioná un día y turno
      </h2>
      <div className="space-y-8">
        {availabilityEntries.map((entry) => (
          <div key={entry.formattedDate} className="border-b border-gray-200 pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                {entry.date.getDate()}
              </span>
              {entry.day}, {entry.formattedDate}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {entry.slots.map((slot: string) => (
                <button
                  key={`${entry.isoDate}-${slot}`}
                  className="py-2.5 px-4 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() =>
                    router.push(
                      `/reservar/contacto?service_id=${serviceId}&barber_id=${barberId}&date=${entry.isoDate}&time=${slot}`
                    )
                  }
                >
                  {slot}
                </button>
              ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
