export enum MEDIATYPE {
  IMAGE = 'image',
  VIDEO = 'video',
}
export enum IMAGETYPE {
  PROFILE = 'profile',
  LOGO = 'logo',
  STORY = 'story',
}

interface IMedia {
  _id: string;
  createdAt: string | number;
  modifiedAt: string | number;
  title: string;
  businessId: string;
  description?: string;
  mediaType: MEDIATYPE;
  imageType: IMAGETYPE;
}

export interface IImageData extends Omit<IMedia, 'mediaType'> {
  publicId: string;
  uploadVerified: boolean;
}
export interface IVideoData extends IMedia {
  vimeoURI: string;
  url: string;
  status: string;
}

export interface INewImageData {
  title: string;
  businessId: string;
  description?: string;
  imageType: IMAGETYPE;
  publicId: string;
}

export interface IImageUpdates {
  title?: string;
  description?: string;
  uploadVerified?: true;
}

export interface INewVideoData {
  title: string;
  businessId: string;
  description?: string;
  videoFile: File;
}

export interface IVideoUpdates {
  title?: string;
  description?: string;
  status?: 'uploaded';
}
