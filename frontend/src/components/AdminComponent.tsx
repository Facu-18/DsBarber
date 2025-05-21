// src/components/AdminQuickLinks.tsx
import Link from 'next/link';

export default function AdminComponent() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Panel de Administración</h2>
      <div className="space-y-3">
        <Link
          href="/admin-panel-ds/horarios"
          className="block w-full bg-blue-800 text-white py-2 rounded-xl shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-200"
        >
          Gestionar tus horarios
        </Link>
        <Link
          href="/admin-panel-ds/turnos/all"
          className="block w-full bg-blue-800 text-white py-2 rounded-xl shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-200"
        >
          Ver tus turnos
        </Link>
      </div>
    </div>
  );
}