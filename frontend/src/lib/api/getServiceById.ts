// src/lib/api/getServiceById.ts
import { z } from 'zod'

const ServiceSchema = z.object({
  service_id: z.number(),
  name: z.string(),
  price: z.number(),
})

export type Service = z.infer<typeof ServiceSchema>

export async function getServiceById(id: number): Promise<Service> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`)
  if (!res.ok) throw new Error('Error al obtener servicio')

  const data = await res.json()
  const parsed = ServiceSchema.safeParse(data)

  if (!parsed.success) {
    console.error('Error de validación de servicio:', parsed.error)
    throw new Error('Respuesta inválida del servidor')
  }

  return parsed.data
}
