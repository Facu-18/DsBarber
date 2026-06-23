"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("PIN incorrecto");
      return;
    }

    router.push("/admin-panel-ds");
  };

  return (
    <section className="mx-auto flex min-h-[65vh] w-full max-w-md items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-white/20 bg-black/70 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">Acceso privado</p>
        <h1 className="mt-3 text-3xl font-black">Panel admin</h1>
        <p className="mt-2 text-sm leading-6 text-white/70">Ingresá el PIN para gestionar turnos y horarios.</p>

        <label className="mt-6 block text-sm font-semibold" htmlFor="admin-pin">
          PIN
        </label>
        <input
          id="admin-pin"
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(event) => {
            setPin(event.target.value.replace(/\D/g, ""));
            setError("");
          }}
          className="mt-2 w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-black outline-none focus:border-red-400"
          autoFocus
        />

        {error ? <p className="mt-3 text-sm font-semibold text-red-300">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-black text-black transition hover:bg-red-100 active:scale-[0.98]"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
