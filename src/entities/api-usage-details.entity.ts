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
  export class ApiUsageDetails extends Model<ApiUsageDetails, Partial<ApiUsageDetails>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT,{name:"usage_id"})
    usageId: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    api_key: string;
  
  
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
      defaultValue: 0,
    })
    monthly_usage_limit?: number;
  }
  