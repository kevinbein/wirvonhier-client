import { BusinessService } from './business';
import { ImagesService } from './images';
import { VideosService } from './videos';
import { GoogleMapsService } from './googleMaps';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProvider {
  [key: string]: any;
  business: BusinessService;
  images: ImagesService;
  videos: VideosService;
  maps: GoogleMapsService;
}

export interface IProviderMock {
  [key: string]: any;
}
