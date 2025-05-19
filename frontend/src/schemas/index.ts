import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  date: z.string(),
  time: z.string(),
  barberId: z.string(),
  serviceId: z.string(),
})

export type Booking = {
  booking_id: number;
  client: { name: string; email: string };
  service: { name: string; price: number };
  date: string;
  time: string;
};

export type Barber = {
  barber_id: number;
  name: string;
};

export const SuccessSchema = z.object({
  message: z.string(),
})

export const ErrorResponseSchema = z.object({
    message: z.string()
})