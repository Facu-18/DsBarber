import { Request, Response } from "express";
import { Barber } from "../models/Barber";
import { Service } from "../models/Service";
import { BarberServicePrice } from "../models/BarberServicePrice";

export class BarberServicePriceController {
  static upsertPrice = async (req: Request, res: Response) => {
    try {
      const barber_id = Number(req.body.barber_id);
      const service_id = Number(req.body.service_id);
      const price = Number(req.body.price);

      if (!Number.isInteger(barber_id) || barber_id <= 0) {
        res.status(400).json({ message: "barber_id inválido" });
        return;
      }

      if (!Number.isInteger(service_id) || service_id <= 0) {
        res.status(400).json({ message: "service_id inválido" });
        return;
      }

      if (!Number.isFinite(price) || price <= 0) {
        res.status(400).json({ message: "price inválido" });
        return;
      }

      const [barber, service] = await Promise.all([
        Barber.findByPk(barber_id),
        Service.findByPk(service_id),
      ]);

      if (!barber) {
        res.status(404).json({ message: "Barbero no encontrado" });
        return;
      }

      if (!service) {
        res.status(404).json({ message: "Servicio no encontrado" });
        return;
      }

      const existing = await BarberServicePrice.findOne({
        where: { barber_id, service_id },
      });

      if (existing) {
        await existing.update({ price });
        res.status(200).json({
          message: "Precio personalizado actualizado",
          data: existing,
        });
        return;
      }

      const created = await BarberServicePrice.create({
        barber_id,
        service_id,
        price,
      });

      res.status(201).json({
        message: "Precio personalizado creado",
        data: created,
      });
    } catch (error) {
      console.error("Error al guardar precio personalizado:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getPrice = async (req: Request, res: Response) => {
    try {
      const barber_id = Number(req.params.barberId);
      const service_id = Number(req.params.serviceId);

      if (!Number.isInteger(barber_id) || barber_id <= 0) {
        res.status(400).json({ message: "barberId inválido" });
        return;
      }

      if (!Number.isInteger(service_id) || service_id <= 0) {
        res.status(400).json({ message: "serviceId inválido" });
        return;
      }

      const service = await Service.findByPk(service_id);
      if (!service) {
        res.status(404).json({ message: "Servicio no encontrado" });
        return;
      }

      const custom = await BarberServicePrice.findOne({
        where: { barber_id, service_id },
      });

      const basePrice = service.price;
      const customPrice = custom?.price ?? null;

      res.status(200).json({
        barber_id,
        service_id,
        base_price: basePrice,
        custom_price: customPrice,
        price: customPrice ?? basePrice,
      });
    } catch (error) {
      console.error("Error al obtener precio personalizado:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}
