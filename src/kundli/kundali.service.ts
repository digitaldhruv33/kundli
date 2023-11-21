import {
  ChartStyle,
  KundliPdfRequest,
  subUserConstants,
} from '../modules/constant';
import { Injectable } from '@nestjs/common';
import { KundliApiWithTrackerService } from 'src/utils/kundli-api-with-tracker.service';

interface AstrologyApiResponse {
  status: boolean;
  pdf_url: string;
}
const logger = console;
@Injectable()
export class KundliService {
  constructor(
    private readonly kundliApiRequestService: KundliApiWithTrackerService,
  ) {}

  /**
   *
   * @title - getMappedKundliRequest
   * @description - A function which takes userData as parameter and maps it to object of type KundliPdfRequest
   * for external api call
   * @param userData
   * @returns kundliRequestObj<KundliPdfRequest>
   *
   */
  public async getMappedKundliRequest(userData: object | any) {
    try {
      const kundliRequestObj: KundliPdfRequest = {};
      kundliRequestObj.language = 'en';
      kundliRequestObj.tzone = 5.5;
      kundliRequestObj.chart_style = ChartStyle.NORTH;
      kundliRequestObj.footer_link = 'https://vama.app';
      kundliRequestObj.logo_url =
        'https://vama.app/static/media/vama-logo.6a6c47aa3b92afb7d85db4c8e06ecff1.svg';
      kundliRequestObj.company_url = 'https://vama.app/';
      kundliRequestObj.domain_url = 'https://vama.app/';
      kundliRequestObj.company_email = 'contact@vama.app';
      kundliRequestObj.company_landline = '';
      kundliRequestObj.company_mobile = '';
      kundliRequestObj.name =
        userData[`${subUserConstants.fName}`] +
        ' ' +
        userData[`${subUserConstants.lName}`];
      kundliRequestObj.gender =
        userData[`${subUserConstants.gender}`] === 'M' ? 'male' : 'female';
      const birthDate: Date = new Date(
        userData[`${subUserConstants.birthDate}`],
      );
      kundliRequestObj.day = birthDate.getUTCDate();
      kundliRequestObj.month = birthDate.getUTCMonth() + 1;
      kundliRequestObj.year = birthDate.getUTCFullYear();
      kundliRequestObj.hour = birthDate.getHours();
      kundliRequestObj.min = birthDate.getMinutes();
      kundliRequestObj.lat = Number(userData[`${subUserConstants.lat}`]);
      kundliRequestObj.lon = Number(userData[`${subUserConstants.lng}`]);
      kundliRequestObj.place = userData[`${subUserConstants.birthPlace}`];

      return kundliRequestObj;
    } catch (err) {
      logger.error('error in get mapped request: ', err);
      throw err;
    }
  }

  /**
   *
   * @title - getFreeKundliPdf
   * @description - A function which takes userData as parameter, maps it and returns the response filepath of external api
   * @param userData
   * @returns freeKundliResponse
   *
   */
  public async getFreeKundliPdf(userData: Record<string, any>) {
    try {
      const requestData: KundliPdfRequest =
        await this.getMappedKundliRequest(userData);
      const response: AstrologyApiResponse = {
        status: false,
        pdf_url: '',
      };
      let freeKundliResponse: any =
        await this.kundliApiRequestService.getFreeKundlis(requestData);
      console.log(
        'freeKundliResponse - ',
        freeKundliResponse,
        typeof freeKundliResponse,
      );
      if (typeof freeKundliResponse === 'string') {
        freeKundliResponse = JSON.parse(freeKundliResponse);
        const res: AstrologyApiResponse = freeKundliResponse
          ? freeKundliResponse
          : response;
        return res.pdf_url;
      }else{
        const res: AstrologyApiResponse = freeKundliResponse
        ? freeKundliResponse.data
        : response;
      return res.pdf_url;
      }
    } catch (err) {
      logger.error('error in get free kundli: ', err);
      throw err;
    }
  }

  /**
   *
   * @title - getPaidKundliPdf
   * @description - A function which takes userData as parameter, maps it and returns the response filepath of external api
   * @param userData
   * @returns paidKundliResponse
   *
   */
  public async getPaidKundliPdf(userData: object | any) {
    try {
      const requestData: KundliPdfRequest =
        await this.getMappedKundliRequest(userData);
      const response: AstrologyApiResponse = {
        status: false,
        pdf_url: '',
      };
      const paidKundliResponse =
        await this.kundliApiRequestService.getPaidKundlis(requestData);
      const res: AstrologyApiResponse = paidKundliResponse.data.status
        ? paidKundliResponse.data
        : response;
      return res.pdf_url;
    } catch (err) {
      logger.error('error in get free kundli: ', err);
      return '';
    }
  }
}
