import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { Booking } from "../models/Booking";
import { getDayNameESLocal } from "../utils/date";
import { BarberAvailability } from "../models/BarberAvailability";
import { Op } from "sequelize";

declare global {
  namespace Express {
    interface Request {
      booking: Booking;
    }
  }
}

export const validateBookingInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Params
  await param("barberId")
    .isInt({ gt: 0 })
    .withMessage("barberId debe ser un entero positivo")
    .run(req);
  await param("serviceId")
    .isInt({ gt: 0 })
    .withMessage("serviceId debe ser un entero positivo")
    .run(req);
  // Body fields
  await body("date")
    .isISO8601()
    .withMessage("date debe tener formato YYYY-MM-DD")
    .run(req);
  await body("time")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("time debe tener formato HH:mm")
    .run(req);
  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .run(req);
  await body("phone")
  .notEmpty()
  .withMessage("El teléfono es obligatorio")
  .matches(/^\+54 9\d{10}$/)
  .withMessage("El teléfono debe comenzar con +54 9 y tener 10 dígitos")
  .run(req);

  next();
};

export const checkBarberAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time } = req.body;
  const barberId = Number(req.params.barberId);

  const rawDayName = getDayNameESLocal(date); // ej: "sábado"
  const dayName = normalizeDayName(rawDayName); // => "Sabado"

  const availability = await BarberAvailability.findOne({
    where: { barber_id: barberId, day: dayName },
  });

  if (!availability) {
    res.status(404).json({ message: "El barbero no trabaja ese día" });
    return;
  }

  const slotTime = time.length === 5 ? time + ":00" : time;

  if (slotTime < availability.start_time || slotTime >= availability.end_time) {
    res.status(400).json({ message: "Hora fuera de disponibilidad" });
    return;
  }

  (req as any).slotTime = slotTime;
  next();
};

function normalizeDayName(input: string): string {
  const sinTildes = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sinTildes.charAt(0).toUpperCase() + sinTildes.slice(1).toLowerCase();
}

export const checkTimeConflict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const barberId = Number(req.params.barberId);
  const { date } = req.body;
  const slotTime = (req as any).slotTime;

  const existing = await Booking.findOne({
    where: { barber_id: barberId, date, time: slotTime },
  });

  if (existing) {
    res.status(409).json({ message: "Ese turno ya está reservado" });
    return;
  }

  next();
};

export const validateBookingId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("booking_id")
    .isInt()
    .withMessage("El id no es valido")
    .bail()
    .custom((value) => value > 0)
    .withMessage("ID no válido")
    .bail()
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateBookingExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawBookingId = req.params.booking_id;
  const booking_id = Number(
    Array.isArray(rawBookingId) ? rawBookingId[0] : rawBookingId
  );
  try {
    const booking = await Booking.findByPk(booking_id);

    if (!booking) {
      const error = new Error("Reserva no encontrada");
      res.status(404).json({ error: error.message });
      return;
    }
    req.booking = booking;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateBookingInputForUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("barber_id")
    .isInt({ gt: 0 })
    .withMessage("barber_id debe ser un entero positivo")
    .run(req);

  await body("service_id")
    .isInt({ gt: 0 })
    .withMessage("service_id debe ser un entero positivo")
    .run(req);

  await body("date")
    .isISO8601()
    .withMessage("La fecha debe ser válida (YYYY-MM-DD)")
    .run(req);

  await body("time")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .withMessage("La hora debe tener formato HH:mm o HH:mm:ss")
    .run(req);

  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);

  await body("email").isEmail().withMessage("Email inválido").run(req);

  await body("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .run(req);

  next();
};

export const checkBarberAvailabilityForUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time, barber_id } = req.body;

  if (!barber_id || !date || !time) {
    res.status(400).json({ message: "Datos insuficientes para verificar disponibilidad" });
    return
  }

  const dayName = getDayNameESLocal(date);

  const availability = await BarberAvailability.findOne({
    where: { barber_id, day: dayName },
  });

  if (!availability) {
    res.status(404).json({ message: "El barbero no trabaja ese día" });
    return 
  }

  const slotTime = time.length === 5 ? time + ":00" : time;

  if (slotTime < availability.start_time || slotTime >= availability.end_time) {
    res.status(400).json({ message: "Hora fuera de disponibilidad" });
    return 
  }

  (req as any).slotTime = slotTime;
  next();
};

export const checkTimeConflictForUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { barber_id, date } = req.body;
  const slotTime = (req as any).slotTime;

  if (!barber_id || !date || !slotTime) {
    res.status(400).json({ message: "Datos insuficientes para verificar conflictos" });
    return
  }

  const bookingId = Number(req.params.booking_id);

  const conflict = await Booking.findOne({
    where: {
      barber_id,
      date,
      time: slotTime,
      booking_id: { [Op.ne]: bookingId }, // Ignora la reserva actual
    },
  });

  if (conflict) {
    res.status(409).json({ message: "Ese turno ya está reservado" });
    return 
  }

  next();
};
