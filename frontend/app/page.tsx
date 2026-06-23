"use client";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center">
      {/* Tarjeta central (glass) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Image src="/DS_Barbershop_Logo.svg" alt="Ds Barberstudio" width={42} height={42} className="drop-shadow" />
          <span className="uppercase tracking-widest text-xs sm:text-sm text-white/80">Barbería</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">Ds Barberstudio</h1>
        <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/90">Donde el estilo cobra vida. Cortes clásicos, fades precisos y rituales de afeitado.</p>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs">Turnos online</span>
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs">Atención personalizada</span>
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs">Productos premium</span>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/reservar" className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white text-black font-semibold shadow-xl hover:shadow-2xl transition active:scale-[0.98]">Reservar turno</Link>
          <Link href="/instalacion" className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 transition">Nuestras instalaciones</Link>
          <Link href="/trabajos" className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 transition">Nuestros trabajos</Link>
          <Link href="/tatto-page" className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 transition">Tatuajes</Link>
          <a href="https://wa.me/543512291106" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 transition" aria-label="WhatsApp">WhatsApp</a>
          <a href="https://www.instagram.com/ds_barbershopok/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 transition" aria-label="Instagram">Instagram</a>
        </div>
      </div>

      {/* Panel inferior de info (opcional) */}
      <aside className="hidden sm:flex gap-3 absolute bottom-6 left-6 text-white/90">
        <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2 text-xs">Lun–Sáb 10:00–20:00</div>
        <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2 text-xs">Bartolomé Hidalgo 1669, Córdoba</div>
      </aside>
    </section>
  );
}
