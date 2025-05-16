// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Spinner from './UI/Spinner'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(2, 'Nombre obligatorio'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(6, 'Teléfono inválido'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceId = searchParams.get('service_id')
  const barberId = searchParams.get('barber_id')
  const date = searchParams.get('date')
  const time = searchParams.get('time')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/create/${barberId}/${serviceId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date, time }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.message)

      router.push('/reservar/confirmacion')
    } catch (error: any) {
      alert(error.message || 'Error al crear la rese  rva')
    } finally {
      setSubmitting(false)
    }
  }

  return submitting ? (
  <div className="flex items-center justify-center h-64">
    <Spinner />
  </div>
) : (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
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

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              {...register('name')}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu nombre"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              {...register('phone')}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
              placeholder="Ingresa tu teléfono"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          Reservar
        </button>
      </form>
    </div>
  )
}
