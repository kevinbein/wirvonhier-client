import { Business } from '@/entities';
import { IHttpSuccessResponse, IHttpErrorResponse } from '@/services';
import { ICloudinaryImageUploadResponse } from '@/services/images/imageService.types';

export interface IBusinessUpdateOptions {
  business: Business;
  key: string;
  value: unknown;
}

export type IUploadImagesResult =
  | IHttpSuccessResponse<ICloudinaryImageUploadResponse>
  | IHttpErrorResponse<ICloudinaryImageUploadResponse>;
