import set from 'lodash/set';
import get from 'lodash/get';
import remove from 'lodash/remove';

import {
  IBusinessData,
  IAddress,
  IUser,
  ILocation,
  IPaymentMethod,
  IValidationError,
  IBusinessMedia,
  IValidationSuccess,
  IUpdateSuccess,
  IUpdateError,
} from './business.types';
import { INewImageData } from '@/entities';
import { Image, Video, IMAGETYPE } from '../media';

const paymentMethods = ['paypal', 'cash', 'creditcard', 'invoice', 'sofort', 'amazon', 'ondelivery', 'sepa', 'other'];
const deliveryOptions = ['collect', 'delivery'];
const emptyAddress = {
  street: '',
  streetNumber: '',
  zip: '',
  city: '',
  state: '',
  country: '',
};

export class Business {
  readonly _id: string;
  readonly createdAt: Date;
  readonly modifiedAt?: Date;
  public dataProtStatement: string;
  public ownerFirstName: string;
  public ownerLastName: string;
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

  private _address!: IAddress;
  public get address(): IAddress {
    return this._address;
  }
  public set address(address: IAddress) {
    this._address = Object.assign(emptyAddress, this._address || {}, address || {});
  }

  constructor(data: IBusinessData) {
    this._id = data._id;
    this.createdAt = new Date(data.createdAt);
    this.modifiedAt = new Date(data.modifiedAt);
    this.dataProtStatement = data.dataProtStatement;
    this.id = data.id;
    this.name = data.name || '';
    this.ownerFirstName = data.ownerFirstName || '';
    this.ownerLastName = data.ownerLastName || '';
    this.address = data.address;

    const { stories, logo, profile } = data.media;
    this.media = {
      logo: new Image(IMAGETYPE.LOGO, logo, this),
      profile: new Image(IMAGETYPE.PROFILE, profile, this),
      stories: {
        images: stories.images.map((image) => new Image(IMAGETYPE.STORY, image, this)),
        videos: stories.videos.map((video) => new Video(video, this)),
      },
    };

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

  public getSortedImagesAndVideos(): (Image | Video)[] {
    // sort media by modified date
    const s = this.media.stories;
    const imagesAndVideos: (Image | Video)[] = [
      ...s.images,
      ...s.videos.filter((video) => video.status === 'complete'),
    ];
    imagesAndVideos.sort((story1: Image | Video, story2: Image | Video) => {
      const time1 = story1.modifiedAt.getTime();
      const time2 = story2.modifiedAt.getTime();
      return time2 - time1;
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
        case '_address':
          return { ...businessData, address: this.address };
        default:
          return { ...businessData, [prop]: get(this, prop) };
      }
    }, {} as IBusinessData);
    return businessData;
  }

  public generateImagePublicId(newImageData: Omit<INewImageData, 'publicId'>): string {
    const randomString = Date.now()
      .toString()
      .substr(Date.now().toString().length - 3);
    return `${this._id}_${newImageData.imageType}_${this.normalizeString(newImageData.title)}_${randomString}`;
  }

  public getImageStoryIds(): string[] {
    return this.media.stories.images.map((image) => image._id);
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
