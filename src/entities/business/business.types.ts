import { Business } from './business';

export interface IBusinessData {
  readonly _id?: string; // MongoDB ID
  readonly createdAt?: string;
  readonly modifiedAt?: string;
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
  readonly media: IBusinessMedia;
  readonly delivery: string[];
  readonly category: string[];
  readonly paymentMethods: IPaymentMethod[];
  readonly distance?: number;
}

export interface IBusinessMedia {
  logo: IImage | null;
  cover: {
    image: IImage | null;
    video: IVideo | null;
  };
  profile: {
    image: IImage | null;
    video: IVideo | null;
  };
  stories: {
    images: IImage[];
    videos: IVideo[];
  };
}

export enum MEDIATYPE {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface IImage {
  _id: string;
  publicId: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description?: string;
  src: string;
}
export interface IVideo {
  _id: string;
  videoId: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
}
export interface IStory {
  _id: string;
  business: Business;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description?: string;
  src: string;
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

export interface IBusinessFilter {
  any?: string;
  id?: string;
  _id?: string;
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
