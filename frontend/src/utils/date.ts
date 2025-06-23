// src/utils/date.ts
function addDays(baseDate: Date, days: number): Date {
  const copy = new Date(baseDate);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function getUpcomingDatesForDay(dayName: string, weeksAhead = 2): Date[] {
  const targetDay = getDayNumberFromName(dayName);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result: Date[] = [];

  const totalDays = 7 * weeksAhead;

  for (let i = 0; i < totalDays; i++) {
    const date = addDays(today, i);
    if (date.getDay() === targetDay) {
      result.push(date);
    }
  }

  return result;
}

function normalizeDayName(day: string): string {
  return day
    .normalize("NFD") // Quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase()); // Primera en mayúscula
}


function getDayNumberFromName(day: string): number {
  const normalized = normalizeDayName(day);
  const daysMap: Record<string, number> = {
    Domingo: 0,
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
  };
  return daysMap[normalized];
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    hour12: false,
    month: "short",
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function generateTimeSlots(
  start: string,
  end: string,
  dateContext?: Date
): string[] {
  if (!dateContext) return [];

  const slots: string[] = [];
  const day = dateContext.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  const pushSlots = (start: string, end: string, step: number) => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);

    const now = new Date();
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const isToday = isSameDay(dateContext, now);

    const startTime = new Date(dateContext);
    startTime.setHours(startHour, startMin, 0, 0);

    const endTime = new Date(dateContext);
    endTime.setHours(endHour, endMin, 0, 0);

    while (startTime < endTime) {
      if (!isToday || startTime > now) {
        const hours = String(startTime.getHours()).padStart(2, "0");
        const minutes = String(startTime.getMinutes()).padStart(2, "0");
        slots.push(`${hours}:${minutes}`);
      }
      startTime.setMinutes(startTime.getMinutes() + step);
    }
  };

  if (day >= 2 && day <= 5) {
    // Martes a Viernes - cada 1 hora
    pushSlots("10:00", "13:00", 60);
    pushSlots("16:00", "21:00", 60);
  } else if (day === 6) {
    // Sábados - cada 1 hora
    pushSlots("10:00", "18:00", 60);
  }

  return slots;
}

export function filterReservedSlots(
  all: string[],
  reserved: string[]
): string[] {
  // Normalizar formatos removiendo segundos
  const normalizedReserved = reserved.map((r) => r.slice(0, 5));
  const reservedSet = new Set(normalizedReserved);

  return all.filter((slot) => !reservedSet.has(slot));
}

export function formatToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque enero es 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function parseLocalDateFromYYYYMMDD(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Parsear fecha se usa en los componentes viewbooking y el page de turn all
export function formatYYYYMMDDToDDMMYYYY(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}