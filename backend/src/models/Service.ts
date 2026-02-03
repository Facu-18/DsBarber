// src/models/Service.ts
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
import { BarberServicePrice } from "./BarberServicePrice";

@Table({
  tableName: "service",
  timestamps: false,
})
export class Service extends Model<Service> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  service_id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @HasMany(() => BarberServicePrice)
  barberPrices!: BarberServicePrice[];
}
