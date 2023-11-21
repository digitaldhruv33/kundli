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
  async getFreeKundlis(requestData: Record<string, any>) {
    requestData['user_id'] = requestData['user_id'] || -3;
    if (this.apiCounter[0] >= 33) {
      throw new HttpException(
        { message: 'Api limit exceed' },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }
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
        // .catch((err) => {
        //   this.cacheManager.set(requestData['user_id'], JSON.stringify(err));
        //   console.log(err);

        //   throw err;
        // })
        .finally(() => {
          this.apiCounter[0]++;
          // request tracker
        })
    );
  }
  getPaidKundlis(requestData: Record<string, any>) {
    return axios
      .post(process.env.PAID_KUNDLI_API as string, requestData, {
        auth: this.auth,
      })
      .finally(() => {
        this.apiCounter[1]++;

        // request tracker
      });
  }
}
