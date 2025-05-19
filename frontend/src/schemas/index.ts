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


export const SuccessSchema = z.object({
  message: z.string(),
})

export const ErrorResponseSchema = z.object({
    message: z.string()
})