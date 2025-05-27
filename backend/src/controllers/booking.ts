import { Request, Response } from "express";
import { Booking } from "../models/Booking";
import { ClientInfo } from "../models/ClientInfo";
import { Service } from "../models/Service";
import { ReservationEmail } from "../emails/ReservationEmail";
import { sendWhatsappNotification } from "../utils/sendWhatsapp";
import { deleteOldBookings } from "../utils/cleanup";
import { Barber } from "../models/Barber";

export class BookingController {
  static createBooking = async (req: Request, res: Response) => {
    try {
      const barber_id = Number(req.params.barberId);
      const service_id = Number(req.params.serviceId);
      const { date, name, email, phone } = req.body;
      const time = (req as any).slotTime;

      // Buscar o crear el cliente
      let client = await ClientInfo.findOne({ where: { email } });
      if (!client) {
        client = await ClientInfo.create({ name, email, phone });
      }

      // Obtener info del barbero
      const barber = await Barber.findByPk(barber_id);
      if (!barber) {
        return res.status(404).json({ message: "Barbero no encontrado" });
      }

      // Crear la reserva
      const booking = await Booking.create({
        barber_id,
        service_id,
        client_id: client.client_id,
        date,
        time,
      });

      // Enviar email
      await ReservationEmail.sendConfirmationEmail({ name, email, date, time });

      // Enviar WhatsApp incluyendo el nombre del barbero
      await sendWhatsappNotification({
        name,
        phone,
        email,
        date,
        time,
        barberName: barber.name,
      });

      res.status(201).json({
        message: "Reserva creada con éxito",
        booking,
      });
    } catch (error) {
      console.error("Error al crear reserva:", error);
      res.status(500).json({ message: "Error interno del servidor" });
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

      res.status(200).json(bookings);
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

      res.status(200).json(booking);
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

      res.json(booking);
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

      res.status(200).json({
        message: "Reserva actualizada con éxito",
        booking,
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
