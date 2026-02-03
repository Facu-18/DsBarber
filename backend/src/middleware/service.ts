import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { Service } from "../models/Service";

declare global {
  namespace Express {
    interface Request {
      service?: Service;
    }
  }
}

export const validateRegisterServiceInput = async (
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

  await body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número mayor a cero")
    .run(req);

  next();
};

export const validateServiceId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("serviceId")
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

export const validateServiceExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawServiceId = req.params.serviceId;
  const serviceId = Number(
    Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId
  );
  try {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      const error = new Error("Servicio no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.service = service;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
