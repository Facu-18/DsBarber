"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const images = [
  { id: 1, src: '/barberia1.jpeg', alt: 'Butacas y espejos — Vista 1' },
  { id: 2, src: '/barberia2.jpeg', alt: 'Detalle del puesto — Vista 2' },
  { id: 3, src: '/barberia3.jpeg', alt: 'Recepción y sala de espera' },
  { id: 4, src: '/barberia4.jpeg', alt: 'Zona de corte — Vista 4' },
  { id: 5, src: '/barberia5.jpeg', alt: 'Iluminación y ambientación' },
  { id: 6, src: '/barberia6.jpeg', alt: 'Herramientas y productos' },
];

export default function InstalacionPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);
  const duration = 5000; // ms por slide

  const prev = () => {
    setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
    setProgress(0);
  };
  const next = () => {
    setIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    setProgress(0);
  };

  // Mejor soporte a accesibilidad: respeta reduce motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setIsPlaying(false);
  }, []);

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsPlaying((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Autoplay + progress
  useEffect(() => {
    let raf: number | null = null;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!isPlaying) {
        start = ts;
        raf = requestAnimationFrame(step);
        return;
      }
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
        start = ts;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const onVis = () => document.hidden && setIsPlaying(false);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [isPlaying]);

  // Swipe
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (startX.current == null || endX.current == null) return;
    const diff = startX.current - endX.current;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
    endX.current = null;
  };

  return (
    <section
      className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 rounded-3xl overflow-hidden"
      role="region"
      aria-label="Carrusel de nuestras instalaciones"
    >
      {/* Encabezado responsive */}
      <div className="mb-3 sm:mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold">Nuestras instalaciones</h2>
          <p className="text-white/70 text-xs sm:text-sm md:text-base">Recorré el espacio deslizando o con las flechas del teclado.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((s) => !s)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition text-xs sm:text-sm"
            aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
            <span className="hidden xs:inline">{isPlaying ? 'Pausar' : 'Reproducir'}</span>
          </button>
        </div>
      </div>

      {/* Grid responsive: imagen grande + columna de thumbnails en desktop */}
      <div className="grid lg:grid-cols-[1fr_minmax(180px,240px)] gap-3 sm:gap-4 lg:gap-6">
        {/* Wrapper del slide */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Imagen */}
          <div className="relative w-full h-[56svh] sm:h-[62svh] md:h-[70svh] lg:h-[72svh] xl:h-[78svh]">
            <Image
              key={images[index].id}
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="(min-width:1024px) 900px, (min-width:640px) 90vw, 100vw"
              className="object-cover select-none animate-[fadeIn_600ms_ease-out]"
              priority
            />
            {/* overlays para contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

            {/* Barra de progreso */}
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-3">
              <div className="w-[92%] max-w-4xl h-1.5 rounded-full bg-white/20 overflow-hidden border border-white/10">
                <div className="h-full bg-white/90 transition-[width] duration-150 ease-linear" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Caption accesible */}
            <div className="absolute bottom-16 left-0 right-0 px-3 sm:px-6 lg:px-8">
              <div className="inline-flex max-w-[92%] sm:max-w-[80%] px-2.5 sm:px-3 py-1.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-xs sm:text-sm" aria-live="polite">
                <span className="sr-only">Slide {index + 1} de {images.length}: </span>
                {images[index].alt}
              </div>
            </div>

            {/* Controles */}
            <button
              onClick={prev}
              className="group absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/45 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full border border-white/15 hover:bg-black/65 transition focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
              aria-label="Imagen anterior"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="group absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/45 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full border border-white/15 hover:bg-black/65 transition focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
              aria-label="Imagen siguiente"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>

            {/* Indicadores (píldoras) */}
            <div className="absolute bottom-4 left-0 right-0 flex w-full justify-center lg:justify-start lg:pl-6">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'}`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columna de thumbnails vertical (solo desktop) */}
        <aside className="hidden lg:block">
          <div className="grid grid-cols-1 gap-2 max-h-[72svh] overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setIndex(i)}
                className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden border transition ${
                  i === index ? 'border-white/80 ring-2 ring-white/50' : 'border-white/20 hover:border-white/60'
                }`}
                aria-label={`Seleccionar miniatura ${i + 1}`}
              >
                <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover" />
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Thumbnails horizontales (solo mobile/tablet) */}
      <div className="mt-4 sm:mt-6 lg:hidden overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 min-w-max">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setIndex(i)}
              className={`relative w-28 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden border transition ${
                i === index ? 'border-white/80 ring-2 ring-white/50' : 'border-white/20 hover:border-white/60'
              }`}
              aria-label={`Seleccionar miniatura ${i + 1}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: .6; transform: scale(1.02) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </section>
  );
}