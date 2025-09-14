'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CalendarClock, ClipboardList } from 'lucide-react';

export default function AdminComponent() {
  const searchParams = useSearchParams();
  const adminKey = searchParams.get('admin_key') ?? '';

  // Para setear/actualizar la admin_key desde el UI (opcional, mejora UX)

  const buildUrl = (path: string) =>
    adminKey ? `${path}?admin_key=${encodeURIComponent(adminKey)}` : path;

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


  const missingKey = !adminKey;

  return (
    <div className="space-y-6">
      {/* Acciones principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {actions.map(({ title, href, icon: Icon, desc }) => {
          const url = buildUrl(href);
          return (
            <Link
              key={href}
              href={url}
              className={`group rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-5 shadow-xl transition
                hover:bg-white/15 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30
                ${missingKey ? 'pointer-events-none opacity-60' : ''}`}
              aria-disabled={missingKey}
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
