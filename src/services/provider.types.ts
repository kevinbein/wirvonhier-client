import { BusinessService } from './business';
import { ImagesService } from './images';
import { VideosService } from './videos';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProvider {
  [key: string]: any;
  business: BusinessService;
  images: ImagesService;
  videos: VideosService;
}

export interface IProviderMock {
  [key: string]: any;
}
