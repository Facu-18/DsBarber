// src/utils/date.ts
export function getUpcomingDatesForDay(
  dayName: string,
  count: number = 7
): Date[] {
  const targetDay = getDayNumberFromName(dayName);
  const today = new Date();
  const results: Date[] = [];

  const date = new Date(today);
  while (results.length < count) {
    if (date.getDay() === targetDay) {
      results.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return results.slice(0, 1);
}

function getDayNumberFromName(day: string): number {
  const daysMap: Record<string, number> = {
    Domingo: 0,
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
  };
  return daysMap[day];
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
  stepMinutes: number = 45,
  dateContext?: Date
): string[] {
  if (!dateContext) return [];

  const slots: string[] = [];
  const day = dateContext.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  const pushSlots = (start: string, end: string, step: number) => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);

    const now = new Date();
    const todayIso = now.toISOString().split("T")[0];
    const isToday = dateContext.toISOString().split("T")[0] === todayIso;

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
