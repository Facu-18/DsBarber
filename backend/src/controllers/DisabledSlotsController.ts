// src/controllers/DisabledSlotController.ts
import { Request, Response } from 'express'
import { DisabledSlot } from '../models/DisabledSlot'

export class DisabledSlotController {
  static async disableSlot(req: Request, res: Response) {
    const { barberId } = req.params
    const { date, time } = req.body

    if (!date || !time) {
        res.status(400).json({ message: 'Faltan parámetros' })
        return 
    }

    const existing = await DisabledSlot.findOne({ where: { barber_id: barberId, date, time } })

    if (existing) {
        res.status(400).json({ message: 'El turno ya está deshabilitado' })
        return 
    }

    await DisabledSlot.create({ barber_id: barberId, date, time })
    res.status(201).json({message: 'Turno desabilitado correctamente'})
  }

  static async enableSlot(req: Request, res: Response) {
    const { barberId } = req.params
    const { date, time } = req.body

    const deleted = await DisabledSlot.destroy({ where: { barber_id: barberId, date, time } })

    if (!deleted) {
        res.status(404).json({ message: 'No se encontró el turno para habilitar' })
        return 
    }

    res.json({ message: 'Turno habilitado nuevamente' })
  }

  static async getDisabledSlots(req: Request, res: Response) {
    const { barberId } = req.params
    const { date } = req.query

    const where: any = { barber_id: barberId }
    if (date) where.date = date

    const slots = await DisabledSlot.findAll({ where })
    res.json({ slots })
  }
}
