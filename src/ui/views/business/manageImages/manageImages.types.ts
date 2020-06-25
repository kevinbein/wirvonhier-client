import { IImage, IVideo } from '@/entities';

export interface IImageData extends IImage {
  saved: boolean;
  isCover?: boolean;
  isLogo?: boolean;
  isStory?: boolean;
  isProfile?: boolean;
}
export interface IVideoData extends IVideo {
  saved: boolean;
  isCover?: boolean;
  isLogo?: boolean;
  isStory?: boolean;
  isProfile?: boolean;
}

export interface IEditableBusinessMediaData {
  logo: IImageData | null;
  cover: {
    image: IImageData | null;
    video: IVideoData | null;
  };
  profile: {
    image: IImageData | null;
    video: IVideoData | null;
  };
  stories: {
    images: IImageData[];
    videos: IVideoData[];
  };
}
