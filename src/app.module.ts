import { KundliApiWithTrackerService } from './utils/kundli-api-with-tracker.service';
import { KundliModule } from './kundli/kundli.module';
import { KundliController } from './kundli/kundli.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KundliService } from './kundli/kundali.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        sync: {
          alter: true,
        },
        autoLoadModels: true,
        logging: false,
        define: {
          underscored: true,
        },
        pool: {
          max: 20,
          min: 1,
          acquire: 5000,
          idle: 30000,
        },
      }),
    }),
    KundliModule,
  ],

  controllers: [KundliController, AppController],
  providers: [KundliApiWithTrackerService, AppService, KundliService],
})
export class AppModule {}
