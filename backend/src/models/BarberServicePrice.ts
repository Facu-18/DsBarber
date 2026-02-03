import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Barber } from "./Barber";
import { Service } from "./Service";

export interface BarberServicePriceAttributes {
  id?: number;
  barber_id: number;
  service_id: number;
  price: number;
}

export type BarberServicePriceCreationAttributes = Omit<
  BarberServicePriceAttributes,
  "id"
>;

@Table({
  tableName: "barber_service_price",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["barber_id", "service_id"],
    },
  ],
})
export class BarberServicePrice
  extends Model<
    BarberServicePriceAttributes,
    BarberServicePriceCreationAttributes
  >
  implements BarberServicePriceAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Barber)
  @Column(DataType.INTEGER)
  barber_id!: number;

  @ForeignKey(() => Service)
  @Column(DataType.INTEGER)
  service_id!: number;

  @Column(DataType.FLOAT)
  price!: number;

  @BelongsTo(() => Barber)
  barber!: Barber;

  @BelongsTo(() => Service)
  service!: Service;
}
