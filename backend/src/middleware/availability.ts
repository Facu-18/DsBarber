import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator/lib";
import { BarberAvailability } from "../models/BarberAvailability";

declare global {
  namespace Express {
    interface Request {
      availability: BarberAvailability;
    }
  }
}

export const validateAvailabilityInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("day")
    .notEmpty()
    .withMessage("El día es obligatorio")
    .isString()
    .withMessage("El día debe ser un texto válido")
    .run(req);

  await body("start_time")
    .notEmpty()
    .withMessage("La hora de inicio es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora de inicio debe tener formato HH:mm")
    .run(req);

  await body("end_time")
    .notEmpty()
    .withMessage("La hora de fin es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora de fin debe tener formato HH:mm")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return 
  }

  // Validación lógica: start_time < end_time
  const { start_time, end_time } = req.body;

  const start = parseTimeToMinutes(start_time);
  const end = parseTimeToMinutes(end_time);

  if (start >= end) {
    res.status(400).json({ 
      message: "La hora de inicio debe ser menor que la hora de fin",
    });
    return
  }

  next();
};

// Función auxiliar para comparar HH:mm en minutos
function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const validateAvailabilityId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("availabilityId")
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

export const validateAvailabilityExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawAvailabilityId = req.params.availabilityId;
  const availabilityId = Number(
    Array.isArray(rawAvailabilityId)
      ? rawAvailabilityId[0]
      : rawAvailabilityId
  );
  try {
    const avaiablity = await BarberAvailability.findByPk(availabilityId);

    if (!avaiablity) {
      const error = new Error("Horario no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.availability = avaiablity;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
