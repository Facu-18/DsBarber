// src/models/DisabledSlot.ts
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Barber } from './Barber'

@Table({ tableName: 'disabled_slots', timestamps: false })
export class DisabledSlot extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Barber)
  @Column
  barber_id!: number

  @Column
  date!: string // formato YYYY-MM-DD

  @Column
  time!: string // formato HH:mm

  @BelongsTo(() => Barber)
  barber!: Barber
}
