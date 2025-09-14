"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { id: 1, src: "/barberia1.jpeg", alt: "Vista de la barbería 1" },
  { id: 2, src: "/barberia2.jpeg", alt: "Vista de la barbería 2" },
  { id: 3, src: "/barberia3.jpeg", alt: "Vista de la barbería 3" },
  { id: 4, src: "/barberia4.jpeg", alt: "Vista de la barbería 4" },
  { id: 5, src: "/barberia5.jpeg", alt: "Vista de la barbería 5" },
  { id: 6, src: "/barberia6.jpeg", alt: "Vista de la barbería 6" },
];

export default function BackgroundCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalMs = 6000;
  const raf = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const next = () => {
    setIndex((p) => (p >= images.length - 1 ? 0 : p + 1));
    setProgress(0);
  };

  useEffect(() => {
    const step = (ts: number) => {
      if (!isPlaying) {
        startRef.current = ts;
        raf.current = requestAnimationFrame(step);
        return;
      }
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, (elapsed / intervalMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
        startRef.current = ts;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    const onVis = () => document.hidden && setIsPlaying(false);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <Image
          key={images[index].id}
          src={images[index].src}
          alt={images[index].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover select-none will-change-transform animate-[fadeIn_600ms_ease-out]"
        />
        {/* Degradados para legibilidad del contenido */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(70%_50%_at_50%_85%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 70%)",
          }}
        />
        {/* Barra de progreso sutil arriba */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-2">
          <div className="w-[92%] max-w-4xl h-1 rounded-full bg-white/20 overflow-hidden border border-white/10">
            <div
              className="h-full bg-white/80 transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: .6; transform: scale(1.015) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}
