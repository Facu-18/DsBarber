// src/lib/api/getServiceById.ts

import { z } from 'zod'

const ServiceSchema = z.object({
  service_id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  base_price: z.number().optional(),
  custom_price: z.number().nullable().optional(),
})

export type Service = z.infer<typeof ServiceSchema>

export async function getServiceById(id: number, barberId?: number): Promise<Service> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams()
  if (typeof barberId === 'number' && Number.isFinite(barberId)) {
    params.set('barberId', String(barberId))
  }

  const query = params.toString()
  const url = query
    ? `${baseUrl}/service/${id}?${query}`
    : `${baseUrl}/service/${id}`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al obtener servicio')

  const data = await res.json()
  const parsed = ServiceSchema.safeParse(data)

  if (!parsed.success) {
    console.error('Error de validación de servicio:', parsed.error)
    throw new Error('Respuesta inválida del servidor')
  }

  return parsed.data
}
