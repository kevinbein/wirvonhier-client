import { IStore } from '@/store';
import { HTTP, DB } from '..';
import { ICloudinaryImageUploadResponse } from './imageService.types';

export class ImagesService {
  private uploadURL = IMAGE_UPLOAD_URL;
  // @ts-ignore
  private worker: unknown;
  // @ts-ignore
  private store: IStore;
  private http: HTTP;
  // @ts-ignore
  private db: DB;

  constructor(store: IStore, worker: unknown, db: DB, http: HTTP) {
    this.worker = worker;
    this.db = db;
    this.http = http;
    this.store = store;
  }

  public get folder(): string {
    switch (CLOUDINARY_IMAGE_PRESET) {
      case 'wirvonhier_image':
        return '';
      case 'wirvonhier_dev':
        return 'development/';
      case 'wirvonhier_test':
        return 'test/';
      default:
        return '';
    }
  }

  async uploadToCloudinary(publicId: string, imageFile: string | Blob): Promise<boolean> {
    const options = {
      file: imageFile,
      upload_preset: CLOUDINARY_IMAGE_PRESET, // eslint-disable-line @typescript-eslint/camelcase
      public_id: publicId, // eslint-disable-line @typescript-eslint/camelcase
    };
    const res = await this.http.post<ICloudinaryImageUploadResponse>(this.uploadURL, options, false, {
      withCredentials: false,
    });
    if (res.status === 'success') {
      return true;
    }
    return false;
  }
}
