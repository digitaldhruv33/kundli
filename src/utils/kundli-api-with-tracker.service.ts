import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class KundliApiWithTrackerService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  private auth = {
    username: process.env.ASTROLOGY_API_USER as string,
    password: process.env.ASTROLOGY_API_KEY as string,
  };
  private readonly apiCounter = [0, 0];
  async getFreeKundlis(apiKey:string,requestData: Record<string, any>) {
    const apiKeyUsageDetails=await this.getApiKeyDetails(apiKey);
    if(apiKeyUsageDetails.currentUsage>=apiKeyUsageDetails.monthlyUsageLimit){
      throw new HttpException(
        { message: 'Api limit exceed' },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }
    requestData['user_id'] = requestData['user_id'] || -3;
    const cachedValue = (await this.cacheManager.get(
      requestData['user_id'],
    )) as string | undefined;
    if (cachedValue) {
      console.log('FOUND', JSON.parse(cachedValue));
      return cachedValue;
    }
    console.log('requestData - ', requestData);
    return (
      axios
        .post(process.env.FREE_KUNDLI_API as string, requestData, {
          auth: this.auth,
        })
        .then((e) => {
          console.log('I am e - ', e.data);
          this.cacheManager.set(requestData['user_id'], JSON.stringify(e.data));
          return e;
        })
        .finally(() => {
          this.apiCounter[0]++;
          // request tracker
        })
    );
  }
  getPaidKundlis(apiKey:string,requestData: Record<string, any>) {
    return axios
      .post(process.env.PAID_KUNDLI_API as string, requestData, {
        auth: this.auth,
      })
      .finally(() => {
        this.apiCounter[1]++;

        // request tracker
      });
  }
  async getApiKeyDetails(apiKey:string){
    return {
      monthlyUsageLimit:0,
      currentUsage:0,
    }
  }
}
