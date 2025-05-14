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

// 1️⃣ Definimos la interfaz de atributos
export interface ClientInfoAttributes {
  client_id?: number;
  name: string;
  email: string;
  phone: string;
}

@Table({ tableName: "client_info", timestamps: false })
export class ClientInfo
  extends Model<ClientInfoAttributes>
  implements ClientInfoAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  client_id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  phone!: string;

  @HasMany(() => Booking)
  bookings!: Booking[];
}
