import {  Router } from "express";
import { validateBarberExists, validateBarberId, validateRegisterBarberInput } from "../middleware/barber";
import { BarberController } from "../controllers/barber";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.param('barberId', validateBarberId)
router.param('barberId', validateBarberExists)

/**
 * @swagger
 * tags:
 *   name: Barberos
 *   description: Endpoints para gestión de barberos
 */

/**
 * @swagger
 * /barber/register-barber:
 *   post:
 *     summary: Registrar un nuevo barbero
 *     tags: [Barberos]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Barbero registrado con éxito
 *       400:
 *         description: Datos inválidos
 */
router.post(
  "/register-barber",
  validateRegisterBarberInput,
  handleInputErrors,
  BarberController.createBarber
);

/**
 * @swagger
 * /barber/upload-image/{barberId}:
 *   post:
 *     summary: Subir imagen de perfil para un barbero
 *     tags: [Barberos]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida con éxito
 */
router.post('/upload-image/:barberId', BarberController.uploadImage);

/**
 * @swagger
 * /barber/barbers:
 *   get:
 *     summary: Obtener todos los barberos
 *     tags: [Barberos]
 *     responses:
 *       200:
 *         description: Lista de barberos
 */
router.get('/barbers', BarberController.getAllBarbers);

/**
 * @swagger
 * /barber/{barberId}:
 *   get:
 *     summary: Obtener un barbero por ID
 *     tags: [Barberos]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del barbero
 *       404:
 *         description: Barbero no encontrado
 */
router.get('/:barberId', BarberController.getBarberId);

/**
 * @swagger
 * /barber/update-barber/{barberId}:
 *   put:
 *     summary: Actualiza los datos de un barbero (nombre, descripción)
 *     tags: [Barberos]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del barbero a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Carlos
 *               description:
 *                 type: string
 *                 example: Barbero con 10 años de experiencia
 *     responses:
 *       200:
 *         description: Barbero actualizado correctamente
 *       400:
 *         description: Validación fallida
 *       404:
 *         description: Barbero no encontrado
 */
router.put(
  '/update-barber/:barberId',
  validateRegisterBarberInput,
  handleInputErrors,
  BarberController.updateBarberById
);

/**
 * @swagger
 * /barber/{barberId}:
 *   delete:
 *     summary: Eliminar un barbero
 *     tags: [Barberos]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado con éxito
 *       404:
 *         description: Barbero no encontrado
 */
router.delete('/:barberId', BarberController.deleteBarberById);

export default router