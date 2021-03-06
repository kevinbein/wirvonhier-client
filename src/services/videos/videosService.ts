import { IStore } from '@/store';
import { HTTP, DB } from '..';
import { IHttpErrorResponse, IHttpSuccessResponse } from '../http';
import { Business, Video } from '@/entities';

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

  async delete(business: Business, video: Video): Promise<boolean> {
    const res = await this.http.delete<void>(`/business/${business._id}/video/${video._id}`);
    return res.status !== 'success';
  }

  uploadToVimeo(uploadURL: string, videoFile: File): null | { value: number } {
    if (!videoFile) return null;

    const progress = {
      value: 0,
    };
    this.http.patch<IHttpErrorResponse<unknown> | IHttpSuccessResponse<unknown>>(uploadURL, videoFile, false, {
      withCredentials: false,
      headers: {
        'Tus-Resumable': '1.0.0',
        'Upload-Offset': 0,
        'Content-Type': 'application/offset+octet-stream',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      onUploadProgress: (progressEvent) => {
        progress.value = progressEvent.loaded / progressEvent.total;
      },
    });
    return progress;
  }
}
