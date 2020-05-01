import { Business, IBusinessData } from '@/entities';
import { DB } from '../db';
import { HTTP } from '..';
import { IBusinessesHTTPResponse, IFindNearBusinessesOptions } from './businessService.types';
import { IStore } from '@/store';
import { IQuery } from '../http';

export class BusinessService {
  // @ts-ignore
  private worker: any;
  private store: IStore;
  private http: HTTP;
  private db: DB;

  constructor(store: IStore, worker: any, db: DB, http: HTTP) {
    this.worker = worker;
    this.db = db;
    this.http = http;
    this.store = store;
  }

  async findNear(options: IFindNearBusinessesOptions): Promise<Business[]> {
    const { zip, lng, lat, maxDistance, limit } = options;
    const value = {
      zip: zip || this.store.state.currentZip,
      lng: lng || (this.store.state.currentLocation && this.store.state.currentLocation[0]),
      lat: lat || (this.store.state.currentLocation && this.store.state.currentLocation[1]),
      maxDistance: maxDistance || 5000,
    };
    if (!value) return [];
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
    const data = (await this.http.get(url)) as IBusinessesHTTPResponse;
    this.db.businesses.addMany(data.list);
    return data.list;
  }

  async getBusinessById(businessId: string): Promise<IBusinessData | null> {
    const fromDB = await this.db.businesses.list.get(businessId);
    if (fromDB) return fromDB;
    const fromAPI = await this.http.get(`businesses/${businessId}`);
    if (fromAPI) {
      this.db.businesses.list.add((fromAPI as unknown) as IBusinessData);
      return (fromAPI as unknown) as IBusinessData;
    }
    return null;
  }
}
