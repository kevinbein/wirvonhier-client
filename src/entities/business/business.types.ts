export interface IBusinessData {
  readonly _id?: string; // MongoDB ID
  readonly created?: string;
  readonly modified?: string;
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
  readonly dataProtStatement: any;
  readonly description: string;
  readonly owner: IUser;
  readonly location: ILocation;
  readonly address?: IAddress;
  readonly media: IBusinessMedia;
  readonly delivery: string[];
  readonly category: string[];
  readonly paymentMethods: IPaymentMethod[];
  readonly distance?: number;
}

export interface IBusinessMedia {
  logo: IImage;
  cover: {
    image: IImage;
    video: IVideo;
  };
  profile: {
    image: IImage;
    video: IVideo;
  };
  stories: {
    images: IImage[];
    videos: IVideo[];
  };
}

export interface IImage {
  _id: string;
  publicId: string;
  created: string;
  modified: string;
  title: string;
  description?: string;
  src: string;
}
export interface IVideo {
  _id: string;
  publicId: string;
  created: string;
  modified: string;
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
  created: string;
  modified: string;
  geo: {
    type: 'Point';
    coordinates: number[];
  };
}
export interface IUser {
  created: string;
  modified: string;
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
export type IBusiness = IBusinessData;

export interface IBusinessFilter {
  any?: string;
  id?: string;
}
