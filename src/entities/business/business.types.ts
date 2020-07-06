import { Business } from './business';
import { Image, Video, IImageData, IVideoData } from '../media';
import { IFilter } from '@/services';

export interface IBusinessData {
  readonly _id: string; // MongoDB ID
  readonly createdAt: string;
  readonly modifiedAt: string;
  readonly id: string; // readable ID from name
  readonly name: string; // Business Name

  /* DEPRECATED */
  readonly ownerFirstName: string;
  readonly ownerLastName: string;
  /* END DEPRECATED */

  onlineShop: string;
  phone: string;
  whatsApp: string;
  instagram: string;
  facebook: string;
  email: string;

  readonly website: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly dataProtStatement: any;
  readonly description: string;
  readonly owner: IUser;
  readonly location: ILocation;
  readonly address: IAddress;
  readonly media: IBusinessMediaData;
  readonly delivery: string[];
  readonly category: string[];
  readonly paymentMethods: IPaymentMethod[];
  readonly distance?: number;
}

export interface IBusinessMediaData {
  logo: IImageData | null;
  profile: IImageData | null;
  stories: {
    images: IImageData[];
    videos: IVideoData[];
  };
}
export interface IBusinessMedia {
  logo: Image;
  profile: Image;
  stories: {
    images: Image[];
    videos: Video[];
  };
}

export interface IAddress {
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
  state: string;
  country: string;
}
export interface ILocation {
  createdAt: string;
  modifiedAt: string;
  geo: {
    type: 'Point';
    coordinates: number[];
  };
}
export interface IUser {
  createdAt: string;
  modifiedAt: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  username?: string;
  password: string;
  acceptedDataProtStatement: string[];
  // leave the company field
  friends: string[];
}

export type IPaymentMethod =
  | 'paypal'
  | 'cash'
  | 'creditcard'
  | 'invoice'
  | 'sofort'
  | 'amazon'
  | 'ondelivery'
  | 'sepa'
  | 'other';

export type IDeliveryOptions = 'collect' | 'delivery';
export type IBusiness = IBusinessData;

export interface IBusinessFilter extends IFilter {
  name: keyof IBusinessData;
  value: IBusinessData[IBusinessFilter['name']];
}

export interface IValidationError {
  status: 'failure';
  field: {
    [key: string]: unknown;
    path: string;
    isArray: boolean;
  };
}
export interface IValidationSuccess {
  status: 'success';
  field: {
    [key: string]: unknown;
    path: string;
    isArray: boolean;
  };
}

export interface IUpdateSuccess {
  status: 'success';
  field: { [key: string]: unknown };
  business: Business;
}
export interface IUpdateError {
  status: 'failure';
  field: { [key: string]: unknown };
  business: Business;
}
