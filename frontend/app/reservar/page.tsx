'use client'

import SelectService from "@/src/components/SelectService";
import Map from "@/src/components/UI/Map";
import SocialNetworks from "@/src/components/UI/SocialNetworks";
import Image from "next/image";
import Link from "next/link";

export default function ElegirServicio() {
  return (
    <div className="min-h-screen flex flex-col items-center py-6 sm:py-8 md:py-12">
      {/* Contenedor principal (glass) */}
      <div className="w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white">
        {/* Sección de información de la barbería */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Izquierda: Logo y descripción */}
          <div className="flex-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              {/* Logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <Image src="/DS_Barbershop_Logo.svg" alt="Logo" width={150} height={60} priority />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">Ds Barberstudio</h1>
            </div>
            <p className="text-white text-xs sm:text-sm md:text-base mb-4">
              Somos Ds Barberstudio, te invitamos a vivir una experiencia única para potenciar tu imagen al 100%.
            </p>
            <SocialNetworks />
          </div>

          {/* Derecha: Información de contacto y mapa */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/15 shadow-sm">
              <Map />
              <Link
                href="https://www.google.com.ar/maps/place/Bartolom%C3%A9+Hidalgo+1660,+X5019+C%C3%B3rdoba/@-31.3593184,-64.1539152,16.75z/data=!4m5!3m4!1s0x943299d5acbeffe7:0xf07ec6359208e65d!8m2!3d-31.3593873!4d-64.1505312?hl=es&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D"
                className="text-xs sm:text-sm text-white hover:text-white transition-colors duration-200 block mb-2"
              >
                Bartolomé Hidalgo 1669, Córdoba Parque Liceo III
              </Link>
              <p className="text-xs sm:text-sm text-white">+54 9 3512291106</p>
              <div className="mt-3 sm:mt-4">
                <span className="text-xs sm:text-sm font-semibold text-white/90">Profesionales:</span>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                  {[
                    { name: "Darío", src: "/imageBarber2.jpeg" },
                    { name: "Joaquín", src: "/imageBarber3.jpg" },
                  ].map((pro, index) => (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-white/20">
                        <Image
                          alt={`Foto de ${pro.name}`}
                          src={pro.src}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-white/80">{pro.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de servicios */}
        <div className="border-t border-white/15 pt-4 sm:pt-6 md:pt-8">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-wide">
            Nuestros servicios
          </h2>
          <SelectService />
        </div>
      </div>
    </div>
  );
}
