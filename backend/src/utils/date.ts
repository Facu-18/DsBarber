export function getDayNameESLocal(dateStr: string): string {
  const WEEKDAYS_ES = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

  const [year, month, day] = dateStr.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // ← mes empieza en 0
  return WEEKDAYS_ES[localDate.getDay()];
}

export function formatToDDMMYYYY(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}
