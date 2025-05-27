import { Router } from "express";
import { BookingController } from "../controllers/booking";
import {
  checkBarberAvailability,
  checkBarberAvailabilityForUpdate,
  checkTimeConflict,
  checkTimeConflictForUpdate,
  validateBookingExists,
  validateBookingId,
  validateBookingInput,
  validateBookingInputForUpdate,
} from "../middleware/booking";
import { handleInputErrors } from "../middleware/validation";
import { validateBarberId, validateBarberExists } from "../middleware/barber";
import {
  validateServiceId,
  validateServiceExists,
} from "../middleware/service";

const router = Router();

router.param("barberId", validateBarberId);
router.param("barberId", validateBarberExists);

router.param("serviceId", validateServiceId);
router.param("serviceId", validateServiceExists);

router.param("booking_id", validateBookingId);
router.param("booking_id", validateBookingExists);


/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Endpoints para gestionar reservas de turnos
 */

/**
 * @swagger
 * /booking/create/{barberId}/{serviceId}:
 *   post:
 *     summary: Crear una nueva reserva de turno
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 example: "10:30"
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada con éxito
 *       400:
 *         description: Validación fallida
 *       409:
 *         description: Conflicto, el turno ya está reservado
 */

router.post(
  "/create/:barberId/:serviceId",
  validateBookingInput,
  handleInputErrors,
  checkBarberAvailability,
  checkTimeConflict,
  BookingController.createBooking
);

/**
 * @swagger
 * /booking/get-all/{barberId}:
 *   get:
 *     summary: Obtener todas las reservas de un barbero
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       404:
 *         description: Barbero no encontrado
 */

router.get("/get-all/:barberId", BookingController.getAllBookings);

/**
 * @swagger
 * /booking/{barberId}/{booking_id}:
 *   get:
 *     summary: Obtener una reserva específica por ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: booking_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la reserva
 *       404:
 *         description: Reserva no encontrada
 */

router.get("/:barberId/:booking_id", BookingController.getBookingById);

/**
 * @swagger
 * /booking/update/{booking_id}:
 *   put:
 *     summary: Actualizar una reserva existente
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: booking_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - barber_id
 *               - service_id
 *               - date
 *               - time
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               barber_id:
 *                 type: integer
 *               service_id:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva actualizada con éxito
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Reserva no encontrada
 */

router.put(
  "/update/:booking_id",
  validateBookingInputForUpdate,
  handleInputErrors,
  checkBarberAvailabilityForUpdate,
  checkTimeConflictForUpdate,
  BookingController.updateBooking
);


/**
 * @swagger
 * /booking/{booking_id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: booking_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 */

router.delete("/:booking_id", BookingController.deleteBooking);

router.get('/view', BookingController.getBookingByDetails);

export default router;
