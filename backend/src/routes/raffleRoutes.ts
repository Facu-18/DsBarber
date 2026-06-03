import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'raffle.json');

type RaffleData = {
  occupiedNumbers: number[];
};

const normalizeNumbers = (numbers: unknown): number[] => {
  if (!Array.isArray(numbers)) return [];

  return Array.from(
    new Set(
      numbers
        .map((number) => Number(number))
        .filter((number) => Number.isInteger(number) && number >= 1 && number <= 60)
    )
  ).sort((a, b) => a - b);
};

const readRaffleData = async (): Promise<RaffleData> => {
  try {
    const content = await fs.readFile(dataFile, 'utf8');
    const parsed = JSON.parse(content) as Partial<RaffleData>;

    return { occupiedNumbers: normalizeNumbers(parsed.occupiedNumbers) };
  } catch (error: unknown) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === 'ENOENT') {
      return { occupiedNumbers: [] };
    }

    throw error;
  }
};

const writeRaffleData = async (data: RaffleData) => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
};

router.get('/', async (_req, res) => {
  try {
    const data = await readRaffleData();
    res.json(data);
  } catch (error) {
    console.error('Error al leer la rifa:', error);
    res.status(500).json({ message: 'No se pudo obtener la rifa' });
  }
});

router.put('/', async (req, res) => {
  try {
    const occupiedNumbers = normalizeNumbers(req.body?.occupiedNumbers);
    const data = { occupiedNumbers };

    await writeRaffleData(data);
    res.json(data);
  } catch (error) {
    console.error('Error al guardar la rifa:', error);
    res.status(500).json({ message: 'No se pudo guardar la rifa' });
  }
});

export default router;
