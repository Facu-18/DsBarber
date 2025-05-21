// src/routes/disabledSlot.ts
import { Router } from 'express'
import { DisabledSlotController } from '../controllers/DisabledSlotsController'
import { validateBarberExists } from '../middleware/barber'
import { validateBarberId } from '../middleware/barber'

const router = Router()

router.param('barberId', validateBarberId)
router.param('barberId', validateBarberExists)

router.post('/disable/:barberId', DisabledSlotController.disableSlot)
router.post('/enable/:barberId', DisabledSlotController.enableSlot)
router.get('/:barberId', DisabledSlotController.getDisabledSlots)

export default router
