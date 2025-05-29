'use client'

import { useSearchParams } from 'next/navigation'
import { createBooking } from '@/src/actions/create-booking-action'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContactForm() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service_id') || ''
  const barberId = searchParams.get('barber_id') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await createBooking({ errors: [], success: '' }, formData)

    if (result.success) {
      toast.success(result.success)
      e.currentTarget.reset()
    }

    if (result.errors.length > 0) {
      result.errors.forEach((e) => toast.error(e))
    }

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
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
              disabled={isSubmitting}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              disabled={isSubmitting}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              name="phone"
              disabled={isSubmitting}
              defaultValue="+54 9"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin inline-block h-5 w-5 border-4 border-t-transparent border-white rounded-full"></span>
              <span>Enviando...</span>
            </>
          ) : (
            'Reservar'
          )}
        </button>
      </form>
    </div>
  )
}
