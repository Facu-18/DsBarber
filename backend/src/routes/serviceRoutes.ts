import { Router } from "express";
import { ServiceController } from "../controllers/service";
import { validateRegisterServiceInput, validateServiceExists, validateServiceId } from "../middleware/service";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.param('serviceId', validateServiceId)
router.param('serviceId', validateServiceExists)

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Endpoints para gestión de servicios de barbería
 */


/**
 * @swagger
 * /service/create-service:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/create-service', 
    validateRegisterServiceInput,
    handleInputErrors,
    ServiceController.createService
)

/**
 * @swagger
 * /service/get-service:
 *   get:
 *     summary: Obtener todos los servicios ordenados por precio ascendente
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get-service', ServiceController.getAllServices)

/**
 * @swagger
 * /service/{serviceId}:
 *   get:
 *     summary: Obtener un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del servicio
 *       404:
 *         description: Servicio no encontrado
 */
router.get('/:serviceId', ServiceController.getServiceById)

/**
 * @swagger
 * /service/update-service/{serviceId}:
 *   put:
 *     summary: Actualizar los datos de un servicio
 *     tags: [Servicios]
 *     parameters:
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
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Servicio actualizado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Servicio no encontrado
 */
router.put('/update-service/:serviceId', 
    validateRegisterServiceInput,
    handleInputErrors,
    ServiceController.updateServiceById
)

/**
 * @swagger
 * /service/delete-service/{serviceId}:
 *   delete:
 *     summary: Eliminar un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Servicio eliminado correctamente
 *       404:
 *         description: Servicio no encontrado
 */
router.delete('/delete-service/:serviceId', ServiceController.deleteServiceById)

export default router