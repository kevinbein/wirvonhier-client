import { Image, Video } from '@/entities';

export interface IImageSize {
  width: number;
  height: number;
}
export interface IImageSizes {
  profile: IImageSize;
  story: IImageSize;
  logo: IImageSize;
}

export interface IImageData extends Image {
  saved: boolean;
  isCover?: boolean;
  isLogo?: boolean;
  isStory?: boolean;
  isProfile?: boolean;
}
export interface IVideoData extends Video {
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
