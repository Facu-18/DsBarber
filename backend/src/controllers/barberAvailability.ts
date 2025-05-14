import { Request, Response } from "express";
import { BarberAvailability } from "../models/BarberAvailability";

export class BarberAvailabilityController {
  static createAvailability = async (req: Request, res: Response) => {
    try {
      const barberId = Number(req.params.barberId);
      const { day, start_time, end_time } = req.body;

      const availability = await BarberAvailability.create({
        barber_id: barberId,
        day,
        start_time,
        end_time,
      });

      res.status(201).json({
        message: "Disponibilidad creada con éxito",
        availability,
      });
    } catch (error) {
      console.error("Error al crear disponibilidad:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getAvailabilityByBarber = async (req: Request, res: Response) => {
    try {
      const barberId = Number(req.params.barberId);

      const availability = await BarberAvailability.findAll({
        where: { barber_id: barberId },
        order: [
          ["day", "ASC"],
          ["start_time", "ASC"],
        ],
      });

      res.status(200).json(availability);
    } catch (error) {
      console.error("Error al obtener disponibilidad:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static updateAvailability = async (req: Request, res: Response) => {
    // Escribir los cambios
    await req.availability!.update(req.body);
    res.json("Horario actualizado correctamente");
  };

  static deleteAvailability = async (req: Request, res: Response) => {
     try {
            const { availabilityId } = req.params;
            await BarberAvailability.destroy({ where: { availability_id: availabilityId } });
            res.json("Horario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el horario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
  };
}
