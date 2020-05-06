import { IStore } from '@/store';
import { HTTP, DB, IHttpSuccessResponse, IHttpErrorResponse } from '..';
import { IImageData } from '@/ui/apps/business/manageImages/manageImages.types';
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

  uploadImage(
    image: IImageData,
  ): null | Promise<
    IHttpSuccessResponse<ICloudinaryImageUploadResponse> | IHttpErrorResponse<ICloudinaryImageUploadResponse>
  > {
    if (!image.src) return null;
    const options = {
      file: image.src,
      upload_preset: CLOUDINARY_IMAGE_PRESET, // eslint-disable-line @typescript-eslint/camelcase
      public_id: image.publicId, // eslint-disable-line @typescript-eslint/camelcase
    };
    return this.http.post<ICloudinaryImageUploadResponse>(this.uploadURL, options, false, { withCredentials: false });
  }
}
