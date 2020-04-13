import { IBusinessData } from '@/entities';
import { IHttpResponse, IQuery } from '../http';

export interface IBusinessesHTTPResponse extends IHttpResponse {
  total: number;
  page: 0;
  perPage: 1000;
  lastPage: 1;
  list: IBusinessData[];
}

export type IBusinessQuery = IQuery;

export interface IFindNearBusinessesOptions {
  zip?: string;
  lng?: number;
  lat?: number;
  maxDistance: number;
  limit?: number;
}
