// src/utils/date.ts
export function getUpcomingDatesForDay(dayName: string, count: number = 7): Date[] {
  const targetDay = getDayNumberFromName(dayName)
  const today = new Date()
  const results: Date[] = []

  let date = new Date(today)
  while (results.length < count) {
    if (date.getDay() === targetDay) {
      results.push(new Date(date))
    }
    date.setDate(date.getDate() + 1)
  }

  return results.slice(0,1)
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
  }
  return daysMap[day]
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    hour12: false,
    month: "short",
  })
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}


export function generateTimeSlots(start: string, end: string, stepMinutes: number = 45): string[] {
  const slots: string[] = [];

  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMin, 0, 0);

  while (startDate < endDate) {
    const hours = String(startDate.getHours()).padStart(2, "0");
    const minutes = String(startDate.getMinutes()).padStart(2, "0");
    slots.push(`${hours}:${minutes}`); // ejemplo: "09:00"

    startDate.setMinutes(startDate.getMinutes() + stepMinutes);
  }

  return slots;
}

export function filterReservedSlots(all: string[], reserved: string[]): string[] {
  // Normalizar formatos removiendo segundos
  const normalizedReserved = reserved.map(r => r.slice(0, 5));
  const reservedSet = new Set(normalizedReserved);
  
  return all.filter(slot => !reservedSet.has(slot));
}
