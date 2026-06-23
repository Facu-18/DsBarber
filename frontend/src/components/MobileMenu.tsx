'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
        aria-label="Abrir menú"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Diálogo fullscreen */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white shadow-md mt-20 text-center text-gray-900">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-blue-700"
                aria-label="Cerrar menú"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2 px-6 pb-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-blue-700 transition-colors duration-200 py-2"
              >
                Inicio
              </Link>
              <Link
                href="/reservar"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-blue-700 transition-colors duration-200 py-2"
              >
                Reservar
              </Link>
              <Link
                href="https://wa.me/543512291106"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-blue-700 transition-colors duration-200 py-2"
              >
                Contacto
              </Link>
            </nav>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
