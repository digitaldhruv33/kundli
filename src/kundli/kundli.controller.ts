import { Body, Controller, Post } from '@nestjs/common';
import { KundliService } from 'src/kundli/kundali.service';
import { RequestData } from 'src/modules/constant';

@Controller('/kundli')
export class KundliController {
  constructor(private readonly kundliService: KundliService) {}
  @Post()
  getFreeKundlis(@Body() subUserConstants:RequestData) {
    console.log('subUserConstants - ',subUserConstants)
    return this.kundliService.getFreeKundliPdf(subUserConstants);
  }
}
