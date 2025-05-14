// src/models/BarberAvailability.ts

import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { Barber } from "./Barber";

export interface BarberAvailabilityAttributes {
  availability_id?: number;
  barber_id: number;
  day: string;
  start_time: string;
  end_time: string;
}

@Table({
  tableName: "barber_availability",
  timestamps: false,
})
export class BarberAvailability extends Model<BarberAvailabilityAttributes> implements BarberAvailabilityAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  availability_id!: number;

  @ForeignKey(() => Barber)
  @Column(DataType.INTEGER)
  barber_id!: number;

  @Column(DataType.STRING)
  day!: string;

  @Column(DataType.TIME)
  start_time!: string;

  @Column(DataType.TIME)
  end_time!: string;

  @BelongsTo(() => Barber)
  barber!: Barber;
}
