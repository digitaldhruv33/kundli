import { Module } from '@nestjs/common';
import { KundliController } from './kundli.controller';
import { KundliService } from 'src/kundli/kundali.service';
import { KundliApiWithTrackerService } from 'src/utils/kundli-api-with-tracker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { KundliEntity } from './kundli.entity';

@Module({
  imports: [SequelizeModule.forFeature([KundliEntity]),
],
  controllers: [KundliController],
  providers: [KundliService, KundliApiWithTrackerService],
})
export class KundliModule {}
