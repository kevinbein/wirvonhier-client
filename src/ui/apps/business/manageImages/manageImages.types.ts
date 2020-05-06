import { IImage } from '@/entities';

export interface IImageData extends IImage {
  saved: boolean;
  markedForDelete: boolean;
  isCover: boolean;
}
