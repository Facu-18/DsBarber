'use client'

import SelectService from "@/src/components/SelectService"
import Map from "@/src/components/UI/Map";
import SocialNetworks from "@/src/components/UI/SocialNetworks";
import Image from "next/image";
import Link from "next/link";

export default function ElegirServicio() {

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12">
            {/* Contenedor principal */}
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                {/* Sección de información de la barbería */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Izquierda: Logo y descripción */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            {/* Placeholder para el logo */}
                            <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">DS</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Ds Barberstudio</h1>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Somos DsBarber, te invitamos a vivir una experiencia distinta a nuestra barberia para
                            potenciar tu imagen al 100%.
                        </p>
                        <SocialNetworks/>
                    </div>

                    {/* Derecha: Información de contacto y "mapa" */}
                    <div className="flex-1">
                        <div className="bg-gray-100 rounded-xl p-4">
                            <Map />
                            <Link 
                                href={'https://www.google.com.ar/maps/place/Bartolom%C3%A9+Hidalgo+1660,+X5019+C%C3%B3rdoba/@-31.3593184,-64.1539152,16.75z/data=!4m5!3m4!1s0x943299d5acbeffe7:0xf07ec6359208e65d!8m2!3d-31.3593873!4d-64.1505312?hl=es&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D'}
                                className="text-sm text-gray-600">
                                Bartolome hidalgo 1660, Córdoba Parque Liceo III
                            </Link>
                            <p className="text-sm text-indigo-600">+54 351 324 4702</p>
                            <div className="flex gap-3 mt-4">
                                <span className="text-sm font-semibold text-gray-800">Profesionales:</span>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Dario</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Agustin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de servicios */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Otros</h2>
                    <SelectService />
                </div>
            </div>
        </div>
    )
}
