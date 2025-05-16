// src/lib/api/getAvailability.ts
import { z } from 'zod'

const AvailabilitySchema = z.object({
  availability_id: z.number(),
  barber_id: z.number(),
  day: z.string(), // Ej: "Monday"
  start_time: z.string(), // Ej: "09:00:00"
  end_time: z.string()    // Ej: "17:00:00"
})

const AvailabilityArraySchema = z.array(AvailabilitySchema)

export type Availability = z.infer<typeof AvailabilitySchema>

export async function getAvailability(barberId: number): Promise<Availability[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availability/${barberId}`)
  if (!res.ok) throw new Error('Error al obtener disponibilidad')

  const data = await res.json()
  const parsed = AvailabilityArraySchema.safeParse(data)
  if (!parsed.success) {
    console.error('Error validando disponibilidad:', parsed.error)
    throw new Error('Respuesta de disponibilidad inválida')
  }

  
  return parsed.data
}
