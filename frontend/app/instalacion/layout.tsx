import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nuestras instalaciones — Ds Barberstudio',
  description: 'Conocé el espacio: butacas, espejos, detalles y ambiente de Ds Barberstudio.',
};

export default function InstalacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      {/* Header compacto */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm hover:opacity-80">← Volver</Link>
            <span className="opacity-40">/</span>
            <h1 className="text-base sm:text-lg font-semibold">Nuestras instalaciones</h1>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <Link href="/reservar" className="hover:text-gray-300">Reservar</Link>
            <Link href="/trabajos" className="hover:text-gray-300">Nuestros trabajos</Link>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1">{children}</main>

      {/* Footer mínimo */}
      <footer className="border-t border-white/10 text-xs text-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
          <span>© 2025 Ds Barberstudio</span>
          <div className="flex gap-4">
            <Link href="https://wa.me/543512291106" target="_blank" className="hover:text-white">WhatsApp</Link>
            <Link href="https://www.instagram.com/ds_barbershopok/" target="_blank" className="hover:text-white">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}