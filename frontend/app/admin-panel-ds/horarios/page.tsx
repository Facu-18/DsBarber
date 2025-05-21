// page.tsx de /admin
import SelectBarberRedirector from '@/src/components/SelectBarberRedirector'

export default function AdminIndexPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>
      <SelectBarberRedirector />
    </div>
  )
}
