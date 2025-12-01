// src/lib/api/getServices.ts
import { z } from 'zod'

const ServiceSchema = z.object({
  service_id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional()
})

export const ServicesArraySchema = z.array(ServiceSchema)

export type Service = z.infer<typeof ServiceSchema>

export async function getServices(): Promise<Service[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 
   
  const res = await fetch(`${baseUrl}/service/get-service`)
  if (!res.ok) throw new Error('Error al obtener servicios')

  const data = await res.json()

  const parsed = ServicesArraySchema.safeParse(data)
  if (!parsed.success) {
    console.error('Error de validación en servicios:', parsed.error)
    throw new Error('Respuesta del servidor inválida')
  }

  return parsed.data
}
