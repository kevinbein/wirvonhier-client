import { IStore } from '@/store';
import { HTTP, DB } from '..';
import { IHttpErrorResponse, IHttpSuccessResponse } from '../http';
import { Business, IVideo } from '@/entities';

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

  async delete(business: Business, video: IVideo): Promise<boolean> {
    const res = await this.http.delete<void>(`/business/${business._id}/video/${video._id}`);
    return res.status !== 'success';
  }

  /* eslint-disable */
  async upload(business: Business, video: INewVideoData): Promise<null | { value: number }> {
    if (!video.file) {
      return null;
    }

    const res = await this.http.post<string>(
      `/business/${business._id}/video`, 
      {
        title: video.title,
        description: video.description,
        size: video.file.size,
      }
    );
    if (res.status !== 'success') {
      console.error('failed to upload video: ', res.error);
      return null;
    }

    // Inform Our Server here with Data from res.data - save in Database

    const uploadLink = (res as IHttpSuccessResponse<string>).data;
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
    
  }
}
