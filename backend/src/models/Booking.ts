import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Barber } from "./Barber";
import { Service } from "./Service";
import { ClientInfo } from "./ClientInfo";

// 1️⃣ Definimos la interfaz de atributos
export interface BookingAttributes {
  booking_id?: number;
  barber_id: number;
  client_id: number;
  service_id: number;
  date: string;
  time: string;
}

@Table({ tableName: "booking", timestamps: false })
export class Booking
  extends Model<BookingAttributes>
  implements BookingAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  booking_id!: number;

  @ForeignKey(() => Barber)
  @Column(DataType.INTEGER)
  barber_id!: number;

  @ForeignKey(() => ClientInfo)
  @Column(DataType.INTEGER)
  client_id!: number;

  @ForeignKey(() => Service)
  @Column(DataType.INTEGER)
  service_id!: number;

  @Column(DataType.DATEONLY)
  date!: string;

  @Column(DataType.TIME)
  time!: string;

  @BelongsTo(() => Barber)
  barber!: Barber;

  @BelongsTo(() => ClientInfo)
  client!: ClientInfo;

  @BelongsTo(() => Service)
  service!: Service;
}
