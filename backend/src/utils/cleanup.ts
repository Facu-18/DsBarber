import { Booking } from "../models/Booking";
import { Op } from "sequelize";

// OBtener fecha de hoy
const getTodayDateArg = (): string => {
  const now = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });
  const today = new Date(now);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export async function deleteOldBookings() {
  const today = getTodayDateArg();

  const deleted = await Booking.destroy({
    where: {
      date: {
        [Op.lt]: today, // elimina solo fechas anteriores al día de hoy
      },
    },
  });

  if (deleted > 0) {
    console.log(`🗑️  Se eliminaron ${deleted} turnos obsoletos`);
  }
}
