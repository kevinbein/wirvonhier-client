import { BusinessService } from './business';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProvider {
  [key: string]: any;
  business: BusinessService;
}

export interface IProviderMock {
  [key: string]: any;
}
