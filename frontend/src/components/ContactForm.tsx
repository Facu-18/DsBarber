'use client'

import { useSearchParams } from 'next/navigation'
import { createBooking } from '@/src/actions/create-booking-action'
import Spinner from './UI/Spinner'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

type BookingActionState = {
  errors: string[]
  success: string
}

export default function ContactForm() {
  const searchParams = useSearchParams()

  const serviceId = searchParams.get('service_id') || ''
  const barberId = searchParams.get('barber_id') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  const initialState: BookingActionState = { errors: [], success: '' }
  const [state, dispatch] = useActionState(createBooking, initialState)

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
    }

    if (state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error))
    }
  }, [state])

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      <form
        action={dispatch}
        className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 font-sans tracking-wide">
          Tus datos
        </h2>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Fecha:</span> {date} <br />
            <span className="font-medium text-gray-800">Hora:</span> {time}
          </p>
        </div>

        <input type="hidden" name="barberId" value={barberId} />
        <input type="hidden" name="serviceId" value={serviceId} />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="time" value={time} />

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              name="name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              name="phone"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu teléfono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          Reservar
        </button>
      </form>
    </div>
  )
}
