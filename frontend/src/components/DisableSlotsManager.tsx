'use client'

import { useEffect, useState } from 'react'
import { generateTimeSlots, getUpcomingDatesForDay, formatDate } from '@/src/utils/date'

interface DisabledSlot {
    date: string // YYYY-MM-DD
    time: string // HH:mm
}

interface Props {
    barberId: number
    adminKey: string
}

export default function DisableSlotManager({ barberId, adminKey }: Props) {
    const [disabledSlots, setDisabledSlots] = useState<DisabledSlot[]>([])
    const [loading, setLoading] = useState(true)

    const start = '09:00'
    const end = '21:00'

    const weekdays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']

    useEffect(() => {
        const fetchDisabled = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL
                const res = await fetch(`${baseUrl}/disabled/${barberId}`);
                const json = await res.json();
                setDisabledSlots(Array.isArray(json.slots) ? json.slots : []);

            } catch (err) {
                console.error('Error cargando slots deshabilitados:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchDisabled()
    }, [barberId])

    const isDisabled = (date: string, time: string) =>
        disabledSlots.some((s) => s.date === date && s.time === time)

    const toggleSlot = async (date: string, time: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const slot = { date, time }
        const url = isDisabled(date, time)
            ? `${baseUrl}/disabled/enable/${barberId}`
            : `${baseUrl}/disabled/disable/${barberId}`

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slot),
            })

            if (!res.ok) throw new Error('Error al modificar slot')

            // Actualizar localmente
            if (isDisabled(date, time)) {
                setDisabledSlots((prev) => prev.filter((s) => !(s.date === date && s.time === time)))
            } else {
                setDisabledSlots((prev) => [...prev, { date, time }])
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <p className="text-center">Cargando horarios...</p>

    return (
        <div className="space-y-10">
            {weekdays.map((day) => {
                const dates = getUpcomingDatesForDay(day, 2); // solo los próximos 2 por día
                return dates.map((date) => {
                    const iso = date.toISOString().split('T')[0];
                    const formatted = formatDate(date);
                    const slots = generateTimeSlots(start, end, 45, date);

                    return (
                        <div key={iso} className="border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{day}, {formatted}</h3>
                            <div className="flex flex-wrap gap-3">
                                {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => toggleSlot(iso, slot)}
                                        className={`px-4 py-2 rounded-xl text-sm border ${isDisabled(iso, slot)
                                            ? 'bg-red-500 text-white border-red-500 cursor-not-allowed opacity-75'
                                            : 'bg-blue-50 text-gray-900 border-blue-200 hover:bg-blue-100'
                                            } transition-all duration-200`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                });
            })}
        </div>
    )
}
