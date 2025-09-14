import AdminComponent from "@/src/components/AdminComponent";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Fondo con imagen + degradado */}
      <div className="absolute inset-0 bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Contenedor glass */}
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Panel de Administración
          </h1>
          <p className="mt-2 text-white/80 text-sm sm:text-base">
            Gestioná tus horarios y revisá tus turnos desde un solo lugar.
          </p>
        </header>

        <Suspense fallback={<p className="text-center text-white/70">Cargando panel…</p>}>
          <AdminComponent />
        </Suspense>
      </div>
    </div>
  );
}
