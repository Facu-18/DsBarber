import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("El email no es válido"),
  phone: z
    .string()
    .regex(
      /^\+54 9\d{10}$/,
      "El teléfono debe comenzar con +54 9 y tener 10 dígitos posteriores"
    ),
  date: z.string().min(1),
  time: z.string().min(1),
  barberId: z.string().min(1),
  serviceId: z.string().min(1),
});
export type Booking = {
  booking_id: number;
  client: { name: string; email: string };
  service: { name: string; price: number };
  final_price?: number | null;
  date: string;
  time: string;
};

export type Barber = {
  barber_id: number;
  name: string;
};

export const SuccessSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
});
