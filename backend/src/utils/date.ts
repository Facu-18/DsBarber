export function getDayNameESLocal(dateStr: string): string {
  const WEEKDAYS_ES = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

  const [year, month, day] = dateStr.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // ← mes empieza en 0
  return WEEKDAYS_ES[localDate.getDay()];
}

// De YYYY-MM-DD a DD-MM-YYYY (para mostrar)
export function formatToDDMMYYYY(dateStr: string): string {
  if (!dateStr || typeof dateStr !== "string") return "Invalid date";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return "Invalid date";
  return `${day}-${month}-${year}`;
}

// De DD-MM-YYYY a YYYY-MM-DD (para almacenar)
export function formatToYYYYMMDD(dateStr: string): string {
  if (!dateStr || typeof dateStr !== "string") return "Invalid date";
  const [day, month, year] = dateStr.split("-");
  if (!day || !month || !year) return "Invalid date";
  return `${year}-${month}-${day}`;
}

