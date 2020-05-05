import { BusinessService } from './business';
import { ImagesService } from './images';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProvider {
  [key: string]: any;
  business: BusinessService;
  images: ImagesService;
}

export interface IProviderMock {
  [key: string]: any;
}
