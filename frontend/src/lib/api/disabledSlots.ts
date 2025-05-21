// src/lib/api/disableSlot.ts
export async function disableSlot(barberId: number, date: string, time: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/disabled/disable/${barberId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, time }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'No se pudo deshabilitar el turno');
  }

  return await res.json();
}
