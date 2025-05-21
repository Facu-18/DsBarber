// src/models/Barber.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Booking } from "./Booking";
import { DisabledSlot } from "./DisabledSlot";

export interface BarberAttributes {
  barber_id?: number;
  name: string;
  image: string;
  description: string;
}

@Table({ tableName: "barber", timestamps: false })
export class Barber
  extends Model<BarberAttributes>
  implements BarberAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  barber_id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.TEXT)
  description!: string;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @HasMany(() => DisabledSlot)
  disabledSlots!: DisabledSlot[];
}
