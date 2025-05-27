// app/admin-panel-ds/horarios/gestionar/page.tsx
import { Suspense } from 'react'
import BarberSlotPageClient from '@/src/components/BarberSlotPageClient'

export default function AdminGestionarPage() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <Suspense fallback={<p className="text-center text-gray-600">Cargando gestor de horarios...</p>}>
        <BarberSlotPageClient />
      </Suspense>
    </div>
  )
}
