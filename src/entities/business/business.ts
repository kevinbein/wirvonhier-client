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

export class Image implements IImage {
  public _id: string;
  public publicId: string;
  public createdAt: string;
  public modifiedAt: string;
  public title: string;
  public description?: string;
  public src: string;
  constructor(data: IImage) {
    this._id = data._id;
    this.publicId = data.publicId;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
    this.title = data.title;
    this.description = data.description;
    this.src = data.src;
  }
}

export class Video implements IVideo {
  public _id: string;
  public videoId: string;
  public title: string;
  public description?: string;
  public status: string;
  public createdAt: string;
  public modifiedAt: string;
  constructor(data: IVideo) {
    this._id = data._id;
    this.videoId = data.videoId;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
  }
}

export class Story implements IStory {
  public _id: string;
  public business: Business;
  public createdAt: string;
  public modifiedAt: string;
  public title: string;
  public description?: string;
  public src: string;
  public type: MEDIATYPE;
  constructor(data: Video | Image, business: Business) {
    this._id = data._id;
    this.business = business;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
    this.title = data.title;
    this.description = data.description;
    if (data instanceof Video) {
      this.src = data.videoId;
      this.type = MEDIATYPE.VIDEO;
    } else {
      this.src = data.publicId;
      this.type = MEDIATYPE.IMAGE;
    }
  }
}

export class BusinessMedia implements IBusinessMedia {
  public logo: Image | null;
  public cover: {
    image: Image | null;
    video: Video | null;
  };
  public profile: {
    image: Image | null;
    video: Video | null;
  };
  public stories: {
    images: Image[];
    videos: Video[];
  };
  constructor(data: IBusinessMedia) {
    this.logo = data.logo;
    this.cover = data.cover;
    this.profile = data.profile;
    this.stories = data.stories;
  }
}

export class Business implements IBusinessData {
  readonly _id?: string;
  readonly createdAt?: string;
  readonly modifiedAt?: string;
  public dataProtStatement: string;
  public ownerFirstName: string;
  public ownerLastName: string;
  public address: IAddress;
  public media: BusinessMedia;
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

    const storyImages: Image[] = data.media.stories.images.map((image) => new Image(image));
    const storyVideos: Video[] = data.media.stories.videos.map((video) => new Video(video));
    this.media = {
      logo: data.media.logo && data.media.logo !== null ? new Image(data.media.logo) : null,
      cover: {
        image:
          data.media.cover && data.media.cover.image && data.media.cover.image !== null
            ? new Image(data.media.cover.image)
            : null,
        video:
          data.media.cover && data.media.cover.video && data.media.cover.video !== null
            ? new Video(data.media.cover.video)
            : null,
      },
      profile: {
        image:
          data.media.profile && data.media.profile.image && data.media.profile.image !== null
            ? new Image(data.media.profile.image)
            : null,
        video:
          data.media.profile && data.media.profile.video && data.media.profile.video !== null
            ? new Video(data.media.profile.video)
            : null,
      },
      stories: {
        images: storyImages,
        videos: storyVideos,
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
