// src/lib/api/getBarbers.ts
import { z } from 'zod'

const BarberSchema = z.object({
  barber_id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string()
})

export const BarbersArraySchema = z.array(BarberSchema)

export type Barber = z.infer<typeof BarberSchema>

export async function getBarbers(): Promise<Barber[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/barber/barbers`)
  if (!res.ok) throw new Error('Error al obtener barberos')

  const data = await res.json()
  const parsed = BarbersArraySchema.safeParse(data)

  if (!parsed.success) {
    console.error('Error de validación en barberos:', parsed.error)
    throw new Error('Respuesta inválida de barberos')
  }

  return parsed.data
}
