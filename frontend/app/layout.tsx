// app/layout.tsx
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import MobileMenu from '@/src/components/MobileMenu';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';


import BackgroundCarousel from '@/src/components/BackgroundCarrusel';


const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ds Barberstudio',
  description: 'Experiencia única para potenciar tu imagen al 100%',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${outfit.className} min-h-screen flex flex-col text-gray-100`}>
        {/* Fondo global */}
        <BackgroundCarousel />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center border border-gray-700 bg-white">
                  <Image src="/DS_Barbershop_Logo.svg" alt="Logo" width={150} height={60} priority />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold text-white">Ds</span>
                  <span className="text-sm font-semibold text-gray-300">Barberstudio</span>
                </div>
              </Link>
            </div>

            {/* Menú de navegación (con tus 2 links nuevos) */}
            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex space-x-6 text-sm font-medium">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Inicio</Link>
                <Link href="/reservar" className="text-gray-300 hover:text-white transition-colors duration-200">Reservar</Link>
                <Link href="/instalacion" className="text-gray-300 hover:text-white transition-colors duration-200">Nuestras instalaciones</Link>
                <Link href="/trabajos" className="text-gray-300 hover:text-white transition-colors duration-200">Nuestros trabajos</Link>
                <Link href="https://wa.me/543512291106" target="_blank" className="text-gray-300 hover:text-white transition-colors duration-200">Contacto</Link>
              </nav>
              <div className="sm:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black/70 backdrop-blur-md border-t border-gray-800 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="mb-4 sm:mb-0">© 2025 Ds Barberstudio. Todos los derechos reservados.</p>
            <div className="flex gap-5">
              <Link href="https://www.instagram.com/ds_barbershopok/" target="_blank" className="hover:text-white transition-colors duration-200" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 110 2 1 1 0 010-2z"/></svg>
              </Link>
              <Link href="https://wa.me/543512291106" target="_blank" className="hover:text-white transition-colors duration-200" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.53 0 .2 5.33.2 11.9c0 2.1.55 4.07 1.52 5.8L0 24l6.49-1.7c1.67.9 3.58 1.4 5.6 1.4h.01c6.53 0 11.86-5.33 11.86-11.9 0-3.18-1.23-6.18-3.44-8.3Zm-8.42 18.02h-.01c-1.77 0-3.47-.48-4.96-1.38l-.36-.21-3.85 1.01 1.03-3.75-.24-.38a9.9 9.9 0 0 1-1.5-5.2C2.21 6.45 6.68 2 12.06 2c2.62 0 5.08 1.02 6.93 2.87a9.83 9.83 0 0 1 2.87 6.97c0 5.39-4.45 9.66-9.76 9.66Z"/></svg>
              </Link>
            </div>
          </div>
        </footer>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover theme="dark" />
      </body>
    </html>
  );
}
