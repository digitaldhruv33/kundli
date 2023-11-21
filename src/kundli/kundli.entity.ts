import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'kundli',
  timestamps: true,
})
export class KundliEntity extends Model<KundliEntity, Partial<KundliEntity>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  api_key?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  user_id?: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    defaultValue: 0,
  })
  monthly_count?: number;
}
