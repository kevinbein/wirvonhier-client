import { IStore } from '@/store';
import { HTTP, DB } from '..';
import { IHttpErrorResponse, IHttpSuccessResponse } from '../http';
import { IRequestVideoUploadResponse } from './videosService.types';

interface INewVideoData {
  title: string;
  description: string;
  file: File | null;
  src: string;
}

export class VideosService {
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

  /* eslint-disable */
  async upload(businessId: string, video: INewVideoData): Promise<null | { value: number }> {
    if (!video.file) {
      return null;
    }

    const res = await this.http.post<IHttpErrorResponse<unknown> | IHttpSuccessResponse<IRequestVideoUploadResponse>>(
      `/business/${businessId}/video`, 
      {
        title: video.title,
        description: video.description,
        size: video.file.size,
      }
    );
    console.log("Received response", res);
    if (res.status !== 'success') {
      console.error('failed to upload video: ', res.error);
      return null;
    }

    // Inform Our Server here with Data from res.data - save in Database

    const uploadLink = (res.data as any).uploadLink;
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
