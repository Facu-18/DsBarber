"use client";

import { getRaffle, updateRaffle } from "@/src/lib/api/raffle";
import { useEffect, useState } from "react";

const raffleNumbers = Array.from({ length: 60 }, (_, index) => index + 1);

export default function RaffleAdminManager() {
  const [occupiedNumbers, setOccupiedNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingNumber, setSavingNumber] = useState<number | null>(null);
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

  const toggleNumber = async (number: number) => {
    const isOccupied = occupiedNumbers.includes(number);
    const nextNumbers = isOccupied
      ? occupiedNumbers.filter((occupiedNumber) => occupiedNumber !== number)
      : [...occupiedNumbers, number].sort((a, b) => a - b);

    setSavingNumber(number);
    setError("");

    try {
      const data = await updateRaffle(nextNumbers);
      setOccupiedNumbers(data.occupiedNumbers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la rifa");
    } finally {
      setSavingNumber(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-white/70">Cargando números de rifa...</p>;
  }

  return (
    <section className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">Rifa</p>
          <h2 className="mt-1 text-xl font-bold text-white">Números ocupados</h2>
        </div>
        <p className="text-sm text-white/70">Ocupados: {occupiedNumbers.length}/60</p>
      </div>

      {error ? <p className="mt-3 rounded-xl bg-red-950/70 px-3 py-2 text-sm text-red-100">{error}</p> : null}

      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {raffleNumbers.map((number) => {
          const isOccupied = occupiedNumbers.includes(number);
          const isSaving = savingNumber === number;

          return (
            <button
              key={number}
              type="button"
              onClick={() => toggleNumber(number)}
              disabled={savingNumber !== null}
              className={`aspect-square rounded-xl border text-sm font-black transition active:scale-95 disabled:cursor-wait disabled:opacity-70 ${
                isOccupied
                  ? "border-red-400 bg-red-600 text-white shadow-lg shadow-red-950/40"
                  : "border-white/15 bg-black/40 text-white/80 hover:border-emerald-400 hover:bg-emerald-700/30"
              }`}
              title={isOccupied ? "Marcar como libre" : "Marcar como ocupado"}
            >
              {isSaving ? "..." : number}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-white/60">
        Toca un número para alternar entre libre y ocupado. La página pública de la rifa lo muestra automáticamente.
      </p>
    </section>
  );
}
