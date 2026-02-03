import { Request, Response } from "express";
import { Booking } from "../models/Booking";
import { ClientInfo } from "../models/ClientInfo";
import { Service } from "../models/Service";
import { ReservationEmail } from "../emails/ReservationEmail";
import { sendWhatsappNotification } from "../utils/sendWhatsapp";
import { deleteOldBookings } from "../utils/cleanup";
import { Barber } from "../models/Barber";
import { BarberServicePrice } from "../models/BarberServicePrice";
import { Op } from "sequelize";

export class BookingController {
  private static async getCustomPriceMap(
    barber_id: number,
    serviceIds: number[]
  ): Promise<Map<number, number>> {
    if (serviceIds.length === 0) return new Map<number, number>();

    const overrides = await BarberServicePrice.findAll({
      where: {
        barber_id,
        service_id: { [Op.in]: serviceIds },
      },
      attributes: ["service_id", "price"],
    });

    return new Map<number, number>(
      overrides.map((item) => [item.service_id, item.price])
    );
  }

  private static async getEffectivePrice(
    barber_id: number,
    service_id: number,
    fallbackPrice?: number
  ): Promise<number | null> {
    const override = await BarberServicePrice.findOne({
      where: { barber_id, service_id },
      attributes: ["price"],
    });

    if (override) return override.price;
    if (typeof fallbackPrice === "number") return fallbackPrice;

    const service = await Service.findByPk(service_id, {
      attributes: ["price"],
    });

    return service ? service.price : null;
  }

  static createBooking = async (req: Request, res: Response) => {
    try {
      const barber_id = Number(req.params.barberId);
      const service_id = Number(req.params.serviceId);
      const { date, name, email, phone } = req.body;
      const time = (req as any).slotTime;

      if (!date || typeof date !== "string") {
        res
          .status(400)
          .json({ message: "La fecha es requerida en formato YYYY-MM-DD." });
        return;
      }

      // Buscar o crear el cliente
      let client = await ClientInfo.findOne({ where: { email } });
      if (!client) {
        client = await ClientInfo.create({ name, email, phone });
      }

      // Verificar que el barbero exista
      const barber = await Barber.findByPk(barber_id);
      if (!barber) {
        res.status(404).json({ message: "Barbero no encontrado" });
        return;
      }
      const service = await Service.findByPk(service_id, {
        attributes: ["price"],
      });
      if (!service) {
        res.status(404).json({ message: "Servicio no encontrado" });
        return;
      }

      // Crear la reserva con la fecha tal como viene (YYYY-MM-DD)
      const booking = await Booking.create({
        barber_id,
        service_id,
        client_id: client.client_id,
        date, // ✅ No se transforma
        time,
      });

      // Enviar email (usa la fecha tal como está para construir el link)
      await ReservationEmail.sendConfirmationEmail({ name, email, date, time });

      // Enviar WhatsApp (usa fecha formateada para mostrar)
      await sendWhatsappNotification({
        name,
        phone,
        email,
        date,
        time,
        barberName: barber.name,
      });

      const finalPrice = await BookingController.getEffectivePrice(
        barber_id,
        service_id,
        service.price
      );

      res.status(201).json({
        message: "Reserva creada con éxito",
        booking: {
          ...booking.toJSON(),
          final_price: finalPrice,
        },
      });
    } catch (error) {
      console.error("Error al crear reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
  };

  static getAllBookings = async (req: Request, res: Response) => {
    try {
      await deleteOldBookings();
      const barber_id = Number(req.params.barberId);

      const bookings = await Booking.findAll({
        where: { barber_id },
        order: [["date", "ASC"]],
        include: [
          { model: ClientInfo, attributes: ["name", "email", "phone"] },
          { model: Service, attributes: ["name", "price"] },
        ],
      });

      const serviceIds = Array.from(new Set(bookings.map((item) => item.service_id)));
      const customPriceMap = await BookingController.getCustomPriceMap(barber_id, serviceIds);

      const response = bookings.map((item) => {
        const plain = item.toJSON() as any;
        const basePrice = plain.service?.price;
        const finalPrice = customPriceMap.get(plain.service_id) ?? basePrice ?? null;

        return {
          ...plain,
          final_price: finalPrice,
        };
      });

      res.status(200).json(response);
      return;
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las reservas" });
    }
  };

  static getBookingById = async (req: Request, res: Response) => {
    try {
      const barber_id = Number(req.params.barberId);
      const booking_id = Number(req.params.booking_id);

      const booking = await Booking.findOne({
        where: { booking_id, barber_id },
        include: [
          { model: ClientInfo, attributes: ["name", "email", "phone"] },
          { model: Service, attributes: ["name", "price"] },
        ],
      });

      if (!booking) {
        res.status(404).json({ message: "Reserva no encontrada" });
        return;
      }

      const plain = booking.toJSON() as any;
      const finalPrice = await BookingController.getEffectivePrice(
        barber_id,
        plain.service_id,
        plain.service?.price
      );

      res.status(200).json({
        ...plain,
        final_price: finalPrice,
      });
    } catch (error) {
      console.error("Error al obtener reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getBookingByDetails = async (req: Request, res: Response) => {
    const { email, date, time } = req.query;

    if (!email || !date || !time) {
      res.status(400).json({ message: "Faltan parámetros" });
      return;
    }

    try {
      const booking = await Booking.findOne({
        include: [
          {
            model: ClientInfo,
            where: { email: email.toString() },
            attributes: ["name", "email", "phone"],
          },
          { model: Barber, attributes: ["name"] },
          { model: Service, attributes: ["name", "price"] },
        ],
        where: {
          date: date.toString(),
          time: time.toString(),
        },
      });

      if (!booking) {
        res.status(404).json({ message: "Reserva no encontrada" });
        return;
      }

      const plain = booking.toJSON() as any;
      const finalPrice = await BookingController.getEffectivePrice(
        plain.barber_id,
        plain.service_id,
        plain.service?.price
      );

      res.json({
        ...plain,
        final_price: finalPrice,
      });
    } catch (error) {
      console.error("Error al buscar reserva:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  };

  static updateBooking = async (req: Request, res: Response) => {
    try {
      const booking = req.booking as Booking;
      const { barber_id, service_id, date, time, name, email, phone } =
        req.body;

      // Crear o reutilizar cliente
      let client = await ClientInfo.findOne({ where: { email } });
      if (!client) {
        client = await ClientInfo.create({ name, email, phone });
      } else {
        await client.update({ name, phone });
      }

      // Actualizar la reserva
      await booking.update({
        barber_id,
        service_id,
        client_id: client.client_id,
        date,
        time: (req as any).slotTime || time, // ya validado por middleware
      });
      const finalPrice = await BookingController.getEffectivePrice(
        Number(barber_id),
        Number(service_id)
      );

      res.status(200).json({
        message: "Reserva actualizada con éxito",
        booking: {
          ...booking.toJSON(),
          final_price: finalPrice,
        },
      });
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static deleteBooking = async (req: Request, res: Response) => {
    try {
      const bookingId = Number(req.params.booking_id);
      // Buscar la reserva
      const booking = await Booking.findByPk(bookingId);
      // Eliminar la reserva
      await booking!.destroy();
      
      res.status(200).json({ message: "Reserva eliminada correctamente" });
      return;
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
  };
}
