import { Request, Response } from "express";
import { Service } from "../models/Service";
import { BarberServicePrice } from "../models/BarberServicePrice";
import { Op } from "sequelize";

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

      const barberIdParam = req.query.barberId?.toString();
      if (!barberIdParam) {
        res.json(service);
        return;
      }

      const barber_id = Number(barberIdParam);
      if (!Number.isInteger(barber_id) || barber_id <= 0) {
        res.status(400).json({ message: "barberId inválido" });
        return;
      }

      const serviceIds = service.map((item) => item.service_id);
      const overrides = await BarberServicePrice.findAll({
        where: {
          barber_id,
          service_id: { [Op.in]: serviceIds },
        },
      });

      const overrideMap = new Map<number, number>(
        overrides.map((item) => [item.service_id, item.price])
      );

      const response = service.map((item) => {
        const plain = item.toJSON();
        const customPrice = overrideMap.get(item.service_id) ?? null;

        return {
          ...plain,
          base_price: plain.price,
          custom_price: customPrice,
          price: customPrice ?? plain.price,
        };
      });

      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getServiceById = async (req: Request, res: Response) => {
    try {
      const serviceId = Number(req.params.serviceId);
      const service = await Service.findByPk(serviceId);

      if (!service) {
        res.status(404).json({ message: "Servicio no encontrado" });
        return;
      }

      const barberIdParam = req.query.barberId?.toString();
      if (!barberIdParam) {
        res.json(service);
        return;
      }

      const barber_id = Number(barberIdParam);
      if (!Number.isInteger(barber_id) || barber_id <= 0) {
        res.status(400).json({ message: "barberId inválido" });
        return;
      }

      const custom = await BarberServicePrice.findOne({
        where: { barber_id, service_id: service.service_id },
      });

      const plain = service.toJSON();
      const customPrice = custom?.price ?? null;

      res.json({
        ...plain,
        base_price: plain.price,
        custom_price: customPrice,
        price: customPrice ?? plain.price,
      });
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
