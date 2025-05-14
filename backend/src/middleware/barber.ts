import { Request, Response, NextFunction } from "express";
import { Barber } from "../models/Barber";
import { body, param, validationResult } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      barber?: Barber;
    }
  }
}

export const validateRegisterBarberInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);

  await body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .run(req);

  next();
};

export const validateBarberId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("barberId")
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

export const validateBarberExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { barberId } = req.params;
  try {
    const barber = await Barber.findByPk(barberId);

    if (!barber) {
      const error = new Error("Barbero no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.barber = barber;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
