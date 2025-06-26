'use client'

import SelectService from "@/src/components/SelectService"
import Map from "@/src/components/UI/Map";
import SocialNetworks from "@/src/components/UI/SocialNetworks";
import Image from "next/image";
import Link from "next/link";

export default function ElegirServicio() {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
            {/* Contenedor principal */}
            <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Sección de información de la barbería */}
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-8">
                    {/* Izquierda: Logo y descripción */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            {/* Logo */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center">
                                <Image src="/DS_Barbershop_Logo.svg" alt="Logo" width={150} height={60} priority />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ds Barberstudio</h1>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                            Somos Ds Barberstudio, te invitamos a vivir una experiencia única para potenciar tu imagen al 100%.
                        </p>
                        <SocialNetworks />
                    </div>

                    {/* Derecha: Información de contacto y "mapa" */}
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                            <Map />
                            <Link
                                href="https://www.google.com.ar/maps/place/Bartolom%C3%A9+Hidalgo+1660,+X5019+C%C3%B3rdoba/@-31.3593184,-64.1539152,16.75z/data=!4m5!3m4!1s0x943299d5acbeffe7:0xf07ec6359208e65d!8m2!3d-31.3593873!4d-64.1505312?hl=es&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D"
                                className="text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200"
                            >
                                Bartolomé Hidalgo 1669, Córdoba Parque Liceo III
                            </Link>
                            <p className="text-sm text-blue-600 mt-1">+54 9 3512291106</p>
                            <div className="flex gap-3 mt-4 items-center">
                                <span className="text-sm font-semibold text-gray-800">Profesionales:</span>
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                alt="Foto de Darío"
                                                src="/imageBarber2.jpeg"
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-600">Darío</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                alt="Foto de Maxi"
                                                src="/imageBarber1.jpeg"
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-600">Maxi</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                alt="Foto de Darío"
                                                src="/imageBarber3.jpg"
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-600">Joaquín</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de servicios */}
                <div className="border-t border-gray-200 pt-6 sm:pt-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 font-sans tracking-wide">
                        Nuestros servicios
                    </h2>
                    <SelectService />
                </div>
            </div>
        </div>
    )
}
