export type RaffleData = {
  occupiedNumbers: number[];
};

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL no esta configurada');
  }

  return baseUrl;
};

export async function getRaffle(): Promise<RaffleData> {
  const res = await fetch(`${getBaseUrl()}/raffle`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('No se pudo obtener la rifa');
  }

  return res.json();
}

export async function updateRaffle(occupiedNumbers: number[]): Promise<RaffleData> {
  const res = await fetch(`${getBaseUrl()}/raffle`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ occupiedNumbers }),
  });

  if (!res.ok) {
    throw new Error('No se pudo guardar la rifa');
  }

  return res.json();
}
