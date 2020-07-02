import { Business, IBusinessData, INewImageData, IImageData, IImageUpdates } from '@/entities';
import { DB } from '../db';
import { HTTP } from '..';
import { IFindNearBusinessesOptions, IHttpBusinessResponse } from './businessService.types';
import { IStore } from '@/store';
import { IQuery, IHttpSuccessResponse, IHttpErrorResponse } from '../http';

export class BusinessService {
  // @ts-ignore
  private worker: unknown;
  private store: IStore;
  private http: HTTP;
  private db: DB;

  constructor(store: IStore, worker: unknown, db: DB, http: HTTP) {
    this.worker = worker;
    this.db = db;
    this.http = http;
    this.store = store;
  }

  /**
   * Loads BusinessData by ID from Server and returns array of BusinessData
   * @param businessIds
   */
  async load(businessIds: string[]): Promise<IBusinessData[]> {
    const promises = businessIds.map((id) => this.http.get<IBusinessData>(`/businesses/${id}`));
    const result = await Promise.all(promises);
    const businesses: IBusinessData[] = [];
    const failed: unknown[] = [];
    for (const item of result) {
      if (this.http.isSuccessful(item)) businesses.push(item.data);
      else failed.push(item.error);
    }
    // TODO: handle failed loads!
    return businesses;
  }

  async fromDB(businessIds: string[]): Promise<Business[]> {
    const promises = businessIds.map((id) => this.db.businesses.list.get(id));
    const result = await Promise.all(promises);
    const businesses: Business[] = [];
    for (const item of result) {
      if (item) businesses.push(new Business(item));
    }
    // const failed: string[] = businessIds.filter((id) => !businesses.some((business) => business._id === id));
    // TODOD: Handle failed
    return businesses;
  }

  async findNear(options: IFindNearBusinessesOptions): Promise<Business[]> {
    const { zip, lng, lat, maxDistance, limit } = options;
    const value = {
      zip: zip || this.store.state.currentZip,
      lng: lng || (this.store.state.currentLocation && this.store.state.currentLocation[0]),
      lat: lat || (this.store.state.currentLocation && this.store.state.currentLocation[1]),
      maxDistance: maxDistance || 5000,
    };

    const newBusinessDataPromise = this.loadBusinessesAndUpdateDB({
      limit,
      filters: [
        {
          name: 'location',
          value,
        },
      ],
    });
    let businessData = await this.db.businesses.findNear(value.maxDistance, limit);
    if (businessData.length === 0) {
      businessData = await newBusinessDataPromise;
    }
    const businesses = businessData.map((data) => new Business(data));
    return businesses;
  }

  async loadBusinessesAndUpdateDB(query: IQuery): Promise<IBusinessData[]> {
    const queryString = this.http.constructQueryString(query);
    const url = `/businesses?${queryString}`;
    const { status, ...res } = await this.http.get<IHttpBusinessResponse>(url);
    if (status === 'failure') return [];
    const data = (res as IHttpSuccessResponse<IHttpBusinessResponse>).data;
    this.db.businesses.addMany(data.list);
    return data.list;
  }

  async getBusinessById(businessId: string): Promise<IBusinessData | null> {
    const fromDB = await this.db.businesses.list.get(businessId);
    if (fromDB) return fromDB; // TODO: Add timestamp and reload if timestamp too old
    const fromAPI = this.loadAndPersistBusiness(businessId);
    return fromAPI;
  }

  async loadAndPersistBusiness(businessId: string): Promise<IBusinessData | null> {
    const { status, ...res } = await this.http.get(`businesses/${businessId}`);
    if (status === 'failure') return null;
    const data = (res as IHttpSuccessResponse<IBusinessData>).data;
    this.db.businesses.list.put(data);
    return data;
  }

  async create(businessData?: Partial<IBusinessData>): Promise<Business[] | null> {
    const { status, ...res } = await this.http.post<Partial<IBusinessData>>('/businesses', {
      businesses: [businessData || {}],
    });
    if (status === 'failure') return null;
    const data = (res as IHttpSuccessResponse<{ createdBusinesses: IBusinessData[]; message: string }>).data;
    return data.createdBusinesses.map((business) => new Business(business));
  }

  async save(businessId: string, businessData: Partial<IBusinessData>): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, media, ...adjustedBusinessData } = businessData;
    const { status, ...res } = await this.http.patch(`/businesses/${businessId}`, adjustedBusinessData, true);
    if (status === 'failure') {
      const error = (res as IHttpErrorResponse<IBusinessData>).error;
      // eslint-disable-next-line no-console
      console.error(error);
      return false;
    }
    return true;
  }

  async saveNewImage(imageData: INewImageData): Promise<IImageData> {
    const res = await this.http.post<{ image: IImageData }>(
      `/businesses/${imageData.businessId}/images`,
      imageData,
      true,
    );
    if (res.status !== 'success') {
      throw new Error('Wir konnten das Bild nicht speichern.');
    }
    return res.data.image;
  }

  async updateImage(businessId: string, imageId: string, updates: IImageUpdates): Promise<void> {
    const res = await this.http.patch<void>(`/businesses/${businessId}/images/${imageId}`, updates, true);
    if (res.status !== 'success') {
      throw new Error('Wir konnten das Bild nicht speichern.');
    }
  }

  async deleteImage(businessId: string, imageId: string): Promise<void> {
    const res = await this.http.delete<void>(`/businesses/${businessId}/images/${imageId}`, true);
    if (res.status !== 'success') {
      throw new Error('Wir konnten das Bild nicht löschen.');
    }
  }
}
