import AvailableDays from "@/src/components/AvailableDays"
import Link from "next/link"
import Map from '@/src/components/UI/Map'

export default function SeleccionarTurno() {
  return (
    
      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
        {/* Sección de información de la barbería */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Izquierda: Logo y descripción */}
          <div className="flex-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl sm:text-2xl">DS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ds Barberstudio</h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Somos Ds Barberstudio, te invitamos a vivir una experiencia única para potenciar tu imagen al 100%.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href="https://www.instagram.com/ds_barbershopok/"
                target="_blank"
                className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4 4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://wa.me/543512291106"
                target="_blank"
                className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-1.72-6.297z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Derecha: Información de contacto */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <Map />
              <Link
                href="https://www.google.com.ar/maps/place/Bartolom%C3%A9+Hidalgo+1660,+X5019+C%C3%B3rdoba/@-31.3593184,-64.1539152,16.75z/data=!4m5!3m4!1s0x943299d5acbeffe7:0xf07ec6359208e65d!8m2!3d-31.3593873!4d-64.1505312?hl=es&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="block text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                Bartolomé Hidalgo 1660, Córdoba Parque Liceo III
              </Link>
              <p className="text-sm text-blue-600 mt-1">+54 9 3512291106</p>
            </div>
          </div>
        </div>

        {/* Componente de selección de días y horarios */}
        <AvailableDays />
        <div className="flex justify-between mt-6">
          <Link
            href="/reservar"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium"
          >
            Atrás
          </Link>
        </div>
      </div>
   
  )
}
