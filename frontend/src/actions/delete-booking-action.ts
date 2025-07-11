// src/actions/delete-booking-action.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function deleteBooking(bookingId: number): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
      method: 'DELETE',
    })

    const json = await res.json()

    if (!res.ok) {
      return { success: false, message: json.message || 'Error al eliminar la reserva' }
    }

    revalidatePath('/admin-panel-ds/turnos') // Ajusta si tu ruta es diferente
    return { success: true, message: json.message || 'Reserva eliminada correctamente' }
  } catch (error) {
    console.error('Error eliminando reserva:', error)
    return { success: false, message: 'Error inesperado al eliminar la reserva' }
  }
}
