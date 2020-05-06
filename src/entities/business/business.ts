import set from 'lodash/set';
import get from 'lodash/get';
import remove from 'lodash/remove';

import {
  IBusinessData,
  IAddress,
  IBusinessMedia,
  IUser,
  ILocation,
  IPaymentMethod,
  IStory,
  IVideo,
  IImage,
  IValidationError,
  IValidationSuccess,
  IUpdateSuccess,
  IUpdateError,
  MEDIATYPE,
} from './business.types';
import { IImageData } from '@/ui/apps/business/manageImages/manageImages.types';

const paymentMethods = ['paypal', 'cash', 'creditcard', 'invoice', 'sofort', 'amazon', 'ondelivery', 'sepa', 'other'];
const deliveryOptions = ['collect', 'delivery'];

export class Business implements IBusinessData {
  readonly _id?: string;
  readonly createdAt?: string;
  readonly modifiedAt?: string;
  public dataProtStatement: string;
  public ownerFirstName: string;
  public ownerLastName: string;
  public address: IAddress;
  public media: IBusinessMedia;
  public delivery: string[];
  public category: string[];
  public paymentMethods: IPaymentMethod[];
  public onlineShop: string;
  public phone: string;
  public whatsApp: string;
  public instagram: string;
  public facebook: string;
  public website: string;
  public email: string;
  public description: string;
  public owner: IUser;
  public id: string;
  public location: ILocation;
  private _distance?: number;
  private _name!: string;

  constructor(data: IBusinessData) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
    this.dataProtStatement = data.dataProtStatement;
    this.id = data.id;
    this.name = data.name || '';
    this.ownerFirstName = data.ownerFirstName || '';
    this.ownerLastName = data.ownerLastName || '';
    this.address = data.address
      ? data.address
      : {
          street: '',
          streetNumber: '',
          zip: '',
          city: '',
          state: '',
          country: '',
        };
    this.media = data.media;
    this.delivery = data.delivery || [];
    this.category = data.category || [];
    this.paymentMethods = data.paymentMethods || [];
    this.phone = data.phone || '';
    this.onlineShop = data.onlineShop || '';
    this.whatsApp = data.whatsApp || '';
    this.instagram = data.instagram || '';
    this.facebook = data.facebook || '';
    this.website = data.website || '';
    this.email = data.email || '';
    this.description = data.description || '';
    this.owner = data.owner;
    this.location = data.location;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.id = this.normalizeString(name);
  }

  /**
   * Returns the distance of the query-location to this business
   * If no query-location was given, this return 0
   */
  get distance(): number {
    return this._distance || 0;
  }
  set distance(distance: number) {
    this._distance = distance * 1000;
  }

  public getSortedImagesAndVideos(): (IImage | IVideo)[] {
    // sort media by modified date
    const imagesAndVideos: (IImage | IVideo)[] = [];
    this.media.stories.images.map((image: IImage) => {
      image.type = MEDIATYPE.IMAGE;
      imagesAndVideos.push(image);
    });
    this.media.stories.videos.map((video: IVideo) => {
      video.type = MEDIATYPE.VIDEO;
      imagesAndVideos.push(video);
    });
    imagesAndVideos.sort((story1: IImage | IVideo, story2: IImage | IVideo) => {
      const time1 = new Date(story1.modifiedAt).getTime();
      const time2 = new Date(story2.modifiedAt).getTime();
      return time1 - time2;
    });
    return imagesAndVideos;
  }

  public update(path: string, value: unknown): IUpdateSuccess | IUpdateError {
    const { status, field } = this.validate(path, value);
    if (status === 'success') {
      if (field.isArray) {
        value ? get(this, field.path).push(path as IPaymentMethod) : remove(get(this, field.path), (p) => p == path);
      } else {
        set(this, path, value);
      }
    }
    return { business: this, status, field };
  }

  public getData(): IBusinessData {
    const businessData = Object.getOwnPropertyNames(this).reduce<IBusinessData>((businessData, prop) => {
      switch (prop) {
        case '__ob__':
          return businessData;
        case '_name':
          return { ...businessData, name: this.name };
        default:
          return { ...businessData, [prop]: get(this, prop) };
      }
    }, {} as IBusinessData);
    return businessData;
  }

  public generateImagePublicId(imageData: IImageData): string {
    const randomString = Date.now()
      .toString()
      .substr(Date.now().toString().length - 3);
    return `${this._id}_${imageData.isCover ? 'cover' : 'story'}_${this.normalizeString(
      imageData.title,
    )}_${randomString}`;
  }

  private validate(rawPath: string, value: unknown): IValidationSuccess | IValidationError {
    const isPaymentMethod = paymentMethods.includes(rawPath);
    const isDeliveryOption = deliveryOptions.includes(rawPath);
    const validValue = typeof get(this, rawPath) === typeof value;
    const status = isPaymentMethod || isDeliveryOption || validValue ? 'success' : 'failure';
    let path = rawPath;
    path = isDeliveryOption ? 'delivery' : path;
    path = isPaymentMethod ? 'paymentMethods' : path;
    const field = {
      isArray: isPaymentMethod || isDeliveryOption,
      isPaymentMethod,
      isDeliveryOption,
      path,
    };
    return { status, field };
  }

  private normalizeString(string: string): string {
    let normalizedString = '';
    if (!string) return normalizedString;
    if (typeof string !== 'string') return '';
    normalizedString = string
      .replace(/[^a-zA-Z\d\s]/g, '')
      .replace(/ +/g, '-')
      .toLowerCase();
    return normalizedString;
  }
}

export class Story implements IStory {
  public _id: string;
  public business: Business;
  public publicId: string;
  public createdAt: string;
  public modifiedAt: string;
  public title: string;
  public description?: string;
  public src: string;
  public type: string;
  constructor(data: IVideo | IImage, business: Business) {
    this._id = data._id;
    this.business = business;
    this.publicId = data.publicId;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
    this.title = data.title;
    this.description = data.description;
    this.src = data.src;
    this.type = data.type;
  }
}
