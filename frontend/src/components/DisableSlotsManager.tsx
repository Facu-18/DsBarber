'use client'

import { useEffect, useState } from 'react'
import { generateTimeSlots, getUpcomingDatesForDay, formatDate, isWithinNext7Days } from '@/src/utils/date'

interface DisabledSlot {
    date: string // YYYY-MM-DD
    time: string // HH:mm
}

interface Props {
    barberId: number
    adminKey: string;
}

export default function DisableSlotManager({ barberId }: Props) {
    const [disabledSlots, setDisabledSlots] = useState<DisabledSlot[]>([])
    const [loading, setLoading] = useState(true)

    const start = '09:00'
    const end = '21:00'

    const weekdays = ['Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

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
        <div className="space-y-8 max-w-5xl mx-auto p-4">
            {weekdays
                .flatMap((day) =>
                    getUpcomingDatesForDay(day)
                        .filter(isWithinNext7Days)
                        .map((date) => ({ day, date }))
                )
                .sort((a, b) => a.date.getTime() - b.date.getTime()) // ⬅️ Orden cronológico
                .map(({ day, date }) => {
                    const iso = date.toISOString().split('T')[0];
                    const formatted = formatDate(date);
                    const slots = generateTimeSlots(start, end, date);

                    return (
                        <div
                            key={iso}
                            className="border border-gray-100 rounded-3xl p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">
                                {day}, <span className="text-gray-600">{formatted}</span>
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => toggleSlot(iso, slot)}
                                        className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ease-in-out ${isDisabled(iso, slot)
                                                ? 'bg-red-100 text-red-800 border-red-200 cursor-not-allowed opacity-80'
                                                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
        </div>
    )
}
