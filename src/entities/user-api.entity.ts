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
  export class UserApi extends Model<UserApi, Partial<UserApi>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT,{name:"api_id"})
    apiId: number;
  
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
    userId?: number;
  }
  