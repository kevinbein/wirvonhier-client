import { IStore } from '@/store';
import { HTTP, DB } from '..';
import { IHttpErrorResponse, IHttpSuccessResponse } from '../http';
import { AxiosResponse } from 'axios';

interface INewVideoData {
  title: string;
  description: string;
  file: File | null;
  src: string;
}

export class VideosService {
  private uploadURL = 'https://api.vimeo.com/me/videos';
  private accessToken = '51768e09be6b37672319e6f8d4188f17';
  private patchURL = 'https://api.vimeo.com/videos/{videoId}';

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
  /* eslint-disable */
  async upload(video: INewVideoData): Promise<null | { value: number }> {
    if (!video.file) return null;
    const options = {
      name: video.title,
      description: video.description,
      upload: {
        approach: 'tus',
        size: video.file.size,
      },
      privacy: {
        embed: 'private',
        view: 'nobody'
      },
    };

    const res = await this.http.post<IHttpErrorResponse<unknown> | IHttpSuccessResponse<unknown>>(this.uploadURL, options, false, {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    });

    if (res.status !== 'success') {
      console.error('failed to upload video: ', res.error);
      return null;
    }

    // Inform Our Server here with Data from res.data - save in Database

    const uploadLink = (res.data as any).upload.upload_link;
    const progress = {
      value: 0,
    };
    this.http.patch<IHttpErrorResponse<unknown> | IHttpSuccessResponse<unknown>>(uploadLink, video.file, false, {
      withCredentials: false,
      headers: {
        'Tus-Resumable':	'1.0.0',
        'Upload-Offset': 0,
        'Content-Type': 'application/offset+octet-stream',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      onUploadProgress: (progressEvent) => {
        progress.value = progressEvent.loaded / progressEvent.total;
        if (progress.value === 1) {
          this.finalizeUpload();
        }
      },
    });
    return progress;
  }

  private finalizeUpload() {
    // inform our server that upload was complete and successful (no need to delete video);
  }
}
