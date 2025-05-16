// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Spinner from './UI/Spinner'

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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-2">Tus datos</h2>

      <p className="text-sm text-gray-700">
        <strong>Servicio:</strong> {serviceId} <br />
        <strong>Barbero:</strong> {barberId} <br />
        <strong>Fecha:</strong> {date} <br />
        <strong>Hora:</strong> {time}
      </p>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input {...register('name')} className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" {...register('email')} className="w-full border px-3 py-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input {...register('phone')} className="w-full border px-3 py-2 rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Reservar
      </button>
    </form>
  )
}
