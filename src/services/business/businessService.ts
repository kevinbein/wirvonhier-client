import { Business, IBusinessData } from '@/entities';
import { DB } from '../db';
import { HTTP } from '..';
import { IFindNearBusinessesOptions, IHttpBusinessResponse } from './businessService.types';
import { IStore } from '@/store';
import { IQuery, IHttpSuccessResponse } from '../http';

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
    const { status, ...res } = await this.http.get<IHttpBusinessResponse>(url);
    if (status === 'failure') return [];
    const data = (res as IHttpSuccessResponse<IHttpBusinessResponse>).data;
    this.db.businesses.addMany(data.list);
    return data.list;
  }

  async getBusinessById(businessId: string): Promise<IBusinessData | null> {
    const fromDB = await this.db.businesses.list.get(businessId);
    if (fromDB) return fromDB;
    const { status, ...res } = await this.http.get(`businesses/${businessId}`);
    if (status === 'failure') return null;
    const data = (res as IHttpSuccessResponse<IBusinessData>).data;
    this.db.businesses.list.add(data);
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

  async save(businessData: IBusinessData): Promise<boolean> {
    const { id } = businessData;
    const { status } = await this.http.patch(`/businesses/${id}`, businessData);
    if (status === 'failure') return false;
    return true;
  }
}
