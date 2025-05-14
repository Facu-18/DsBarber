import { Request, Response } from "express";
import { Service } from "../models/Service";

export class ServiceController {
  static createService = async (req: Request, res: Response) => {
    try {
      const newService = await Service.create(req.body);
      await newService.save();

      res.status(201).json({
        message: "Servicio registrado con éxito",
        barber: newService,
      });
    } catch (error) {
      console.error("Error al registrar el servicio:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getAllServices = async (req: Request, res: Response) => {
    try {
      const service = await Service.findAll({
        order: [["price", "ASC"]],
      });
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getServiceById = async (req: Request, res: Response) => {
    try {
      const serviceId = req.params.serviceId;
      const service = await Service.findByPk(serviceId);
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateServiceById = async (req: Request, res: Response) => {
    // Escribir los cambios
        await req.service!.update(req.body)
        res.json(' actualizada correctamente')
  };

  static deleteServiceById = async (req: Request, res: Response) => {
    // Eliminar especie
        await req.service!.destroy()
        res.json('servicio eliminado correctamente')
  }
}
