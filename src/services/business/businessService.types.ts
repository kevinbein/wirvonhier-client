import { IBusinessData } from '@/entities';
import { IQuery } from '../http';

export interface IHttpBusinessResponse {
  total: number;
  page: 0;
  perPage: 5;
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
