'use server'

import { BookingSchema, ErrorResponseSchema, SuccessSchema } from '@/src/schemas'
import { redirect } from 'next/navigation'

type BookingActionState = {
  errors: string[]
  success: string
}

export async function createBooking(
  prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const data = {
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    phone: formData.get('phone')?.toString().trim() || '',
    date: formData.get('date')?.toString().trim() || '',
    time: formData.get('time')?.toString().trim() || '',
    barberId: formData.get('barberId')?.toString().trim() || '',
    serviceId: formData.get('serviceId')?.toString().trim() || '',
  }

  const parsed = BookingSchema.safeParse(data)

  if (!parsed.success) {
    return {
      errors: parsed.error.errors.map((e) => e.message),
      success: prevState.success,
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/booking/create/${data.barberId}/${data.serviceId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  const json = await res.json()

  if (!res.ok) {
    try {
      const parsedError = ErrorResponseSchema.parse(json)
      return {
        errors: [parsedError.message],
        success: prevState.success,
      }
    } catch {
      return {
        errors: ['Error desconocido al crear reserva'],
        success: prevState.success,
      }
    }
  }

  try {
    const parsedSuccess = SuccessSchema.parse(json)
    redirect('/reservar/confirmacion') // opcional
    return {
      errors: [],
      success: parsedSuccess.message,
    }
  } catch {
    return {
      errors: [],
      success: 'Reserva confirmada te enviamos un correo. Muchas Gracias',
    }
  }
}
