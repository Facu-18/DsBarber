'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { CalendarClock, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminComponent() {
  const router = useRouter();

  const actions = useMemo(
    () => [
      {
        title: 'Gestionar tus horarios',
        href: '/admin-panel-ds/horarios',
        icon: CalendarClock,
        desc: 'Definí días, rangos y disponibilidad.',
      },
      {
        title: 'Ver tus turnos',
        href: '/admin-panel-ds/turnos/all',
        icon: ClipboardList,
        desc: 'Revisá agenda completa y detalles de reservas.',
      },
    ],
    []
  );


  const logout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' });
    router.push('/admin-login');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Acciones principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {actions.map(({ title, href, icon: Icon, desc }) => {
          return (
            <Link
              key={href}
              href={href}
              className={`group rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-5 shadow-xl transition
                hover:bg-white/15 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 border border-white/15">
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="text-sm text-white/80">{desc}</p>
              <div className="mt-4 text-sm font-medium text-white/80 group-hover:text-white">
                Ir ahora →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
