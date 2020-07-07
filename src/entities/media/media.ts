import { IImageData, IVideoData, MEDIATYPE, IMAGETYPE } from '.';
import get from 'lodash/get';
import { Business } from '../business';

export class Media {
  public _id!: string;
  public createdAt!: Date;
  public modifiedAt!: Date;
  public title!: string;
  public description?: string;
  public mediatype!: MEDIATYPE;
  public businessId?: string;
  public business!: Business | null;

  constructor(data: Partial<IVideoData> | Partial<IImageData> | null, business: Business | null) {
    if (!data) {
      this.createNullObject();
      return;
    }
    this._id = data._id || '0';
    this.createdAt = new Date(data.createdAt || Date.now());
    this.modifiedAt = new Date(data.modifiedAt || Date.now());
    this.title = data.title || '';
    this.description = data.description;
    this.businessId = data.businessId;
    this.business = business;

    if (this.isVideo(data)) {
      this.mediatype = MEDIATYPE.VIDEO;
    } else {
      this.mediatype = MEDIATYPE.IMAGE;
    }
  }

  public getData(): IImageData {
    const imageData = Object.getOwnPropertyNames(this).reduce<IImageData>((data, prop) => {
      switch (prop) {
        case '__ob__':
          return data;
        case 'business':
          return data;
        default:
          return { ...data, [prop]: get(this, prop) };
      }
    }, {} as IImageData);
    return imageData;
  }

  private isVideo(data: Partial<IVideoData> | Partial<IImageData>): data is Partial<IVideoData> {
    return 'vimeoURI' in data;
  }

  private createNullObject(): void {
    // define default object / placeholder
  }
}

export class Video extends Media {
  public vimeoURI!: string;
  public url!: string;
  public status!: string;
  constructor(data: IVideoData | null, business: Business) {
    super(data, business);
    if (!data) return;
    this.vimeoURI = data.vimeoURI;
    this.url = data.url;
    this.status = data.status;
  }
}

export class Image extends Media {
  public publicId!: string;
  public src!: string;
  public imageType!: IMAGETYPE;
  public uploadVerified = true;

  constructor(imageType: IMAGETYPE, data: IImageData | null, business: Business | null) {
    super(data, business);
    if (!data) {
      switch (imageType) {
        case IMAGETYPE.LOGO: {
          this.publicId = 'intern/logo_192x192_kzhpav';
          break;
        }
        case IMAGETYPE.PROFILE: {
          this.publicId = 'intern/dummy_cover_1024x576_kc12om';
          break;
        }
        case IMAGETYPE.STORY: {
          this.publicId = 'intern/dummy_story_500x1000_uumhep';
          break;
        }
      }
      return;
    }
    this.publicId = data.publicId;
    this.imageType = imageType;
  }
}
