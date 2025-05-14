

import { Router } from 'express';
import { BarberAvailabilityController } from '../controllers/barberAvailability';
import { validateBarberExists, validateBarberId } from '../middleware/barber';
import { validateAvailabilityExists, validateAvailabilityId, validateAvailabilityInput } from '../middleware/availability';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.param('barberId', validateBarberId);
router.param('barberId', validateBarberExists);

router.param('availabilityId', validateAvailabilityId);
router.param('availabilityId', validateAvailabilityExists);

/**
 * @swagger
 * tags:
 *   name: Disponibilidad
 *   description: Endpoints para manejar la disponibilidad de los barberos
 */

/**
 * @swagger
 * /availability/create/{barberId}:
 *   post:
 *     summary: Crear disponibilidad para un barbero
 *     tags: [Disponibilidad]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barbero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - start_time
 *               - end_time
 *             properties:
 *               day:
 *                 type: string
 *                 example: Monday
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "13:00:00"
 *     responses:
 *       201:
 *         description: Disponibilidad creada con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  '/create/:barberId',
  validateAvailabilityInput,
  handleInputErrors,
  BarberAvailabilityController.createAvailability
);

/**
 * @swagger
 * /availability/{barberId}:
 *   get:
 *     summary: Obtener disponibilidad de un barbero
 *     tags: [Disponibilidad]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barbero
 *     responses:
 *       200:
 *         description: Lista de disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   availability_id:
 *                     type: integer
 *                   barber_id:
 *                     type: integer
 *                   day:
 *                     type: string
 *                   start_time:
 *                     type: string
 *                     format: time
 *                   end_time:
 *                     type: string
 *                     format: time
 *       404:
 *         description: Barbero no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:barberId', BarberAvailabilityController.getAvailabilityByBarber);

/**
 * @swagger
 * /availability/{availabilityId}:
 *   put:
 *     summary: Actualizar disponibilidad existente
 *     tags: [Disponibilidad]
 *     parameters:
 *       - in: path
 *         name: availabilityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la disponibilidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disponibilidad actualizada con éxito
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró la disponibilidad
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  '/:availabilityId',
  validateAvailabilityInput,
  handleInputErrors,
  BarberAvailabilityController.updateAvailability
);

/**
 * @swagger
 * /availability/{availabilityId}:
 *   delete:
 *     summary: Eliminar disponibilidad
 *     tags: [Disponibilidad]
 *     parameters:
 *       - in: path
 *         name: availabilityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la disponibilidad
 *     responses:
 *       200:
 *         description: Disponibilidad eliminada con éxito
 *       404:
 *         description: No se encontró la disponibilidad
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:availabilityId', BarberAvailabilityController.deleteAvailability);

export default router;