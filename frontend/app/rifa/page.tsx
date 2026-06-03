"use client";

import Image from "next/image";
import { getRaffle } from "@/src/lib/api/raffle";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "543512291106";
const raffleNumbers = Array.from({ length: 60 }, (_, index) => index + 1);

const prizes = [
  {
    place: "1er Premio",
    title: "3 cortes gratis",
    detail: "Tres turnos para renovar tu estilo en BarberShop DS.",
    accent: "bg-red-700",
  },
  {
    place: "2do Premio",
    title: "Fernet Branca + Coca 2,25 L",
    detail: "Un combo para compartir y festejar.",
    accent: "bg-blue-700",
  },
  {
    place: "3er Premio",
    title: "Cera o aceite para barba",
    detail: "Producto premium para cuidar tu barba.",
    accent: "bg-white text-black",
  },
];

export default function RifaPage() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [occupiedNumbers, setOccupiedNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRaffle = async () => {
      try {
        const data = await getRaffle();
        setOccupiedNumbers(data.occupiedNumbers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar la rifa");
      } finally {
        setLoading(false);
      }
    };

    loadRaffle();
  }, []);

  const whatsappText = selectedNumber
    ? `Hola BarberShop DS! Quiero reservar el numero ${selectedNumber} para la rifa de $6.000. Esta disponible?`
    : "Hola BarberShop DS! Quiero participar en la rifa de $6.000. Me pasan los numeros disponibles?";

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section className="mx-auto w-full max-w-6xl text-white">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/75 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.45),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white p-2">
                  <Image src="/DS_Barbershop_Logo.svg" alt="DS BarberShop" width={46} height={46} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">Rifa temporal</p>
                  <p className="text-sm text-white/70">BarberShop DS</p>
                </div>
              </div>

              <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                Participa y gana
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Elegi un numero libre del 1 al 60 y consultalo por WhatsApp para reservarlo antes de que se agote.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">Valor</p>
                  <p className="mt-2 text-3xl font-black text-red-500">$6.000</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">Numeros</p>
                  <p className="mt-2 text-3xl font-black">{loading ? "..." : `${60 - occupiedNumbers.length}/60`}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">Reserva</p>
                  <p className="mt-2 text-xl font-black">Por WhatsApp</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {prizes.map((prize) => (
                <article key={prize.place} className="rounded-3xl border border-white/15 bg-zinc-950/80 p-4 shadow-xl">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${prize.accent}`}>
                    {prize.place}
                  </span>
                  <h2 className="mt-4 text-xl font-black uppercase leading-tight">{prize.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">{prize.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">Consulta tu numero</p>
                <h2 className="mt-2 text-2xl font-black">Selecciona del 1 al 60</h2>
              </div>
              <p className="text-sm text-white/60">Rojo ocupado, blanco libre.</p>
            </div>

            {error ? <p className="mt-4 rounded-xl bg-red-950/70 px-3 py-2 text-sm text-red-100">{error}</p> : null}

            <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-6">
              {raffleNumbers.map((number) => {
                const isSelected = selectedNumber === number;
                const isOccupied = occupiedNumbers.includes(number);

                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => !isOccupied && setSelectedNumber(number)}
                    disabled={isOccupied || loading}
                    className={`aspect-square rounded-xl border text-sm font-black transition active:scale-95 sm:text-base ${
                      isOccupied
                        ? "cursor-not-allowed border-red-500/70 bg-red-950/80 text-red-100 line-through opacity-75"
                        : isSelected
                        ? "border-red-400 bg-red-600 text-white shadow-lg shadow-red-950/60"
                        : "border-white/15 bg-black/45 text-white/80 hover:border-red-400 hover:bg-red-600/20 disabled:cursor-wait disabled:opacity-60"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Numero ${number} ${isOccupied ? "ocupado" : "libre"}`}
                  >
                    {number}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/15 bg-black/45 p-4">
              <p className="text-sm text-white/70">
                {selectedNumber
                  ? `Numero elegido: ${selectedNumber}. Toca el boton para consultar disponibilidad y reservarlo.`
                  : "Los numeros en rojo ya estan ocupados. Tambien podes escribir sin elegir numero y pedir la lista de disponibles."}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-center font-black text-black transition hover:bg-red-100 active:scale-[0.98]"
              >
                {selectedNumber ? `Consultar numero ${selectedNumber} por WhatsApp` : "Pedir numeros disponibles"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
