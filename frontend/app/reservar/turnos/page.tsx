import AvailableDays from "@/src/components/AvailableDays"

export default function SeleccionarTurno() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Seleccioná un día</h1>
      <AvailableDays />
    </div>
  )
}
