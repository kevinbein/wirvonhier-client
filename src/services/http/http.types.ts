import { AxiosError, AxiosResponse } from 'axios';

export interface IHttpSuccessResponse<T> {
  status: 'success';
  data: T;
}
export interface IHttpSuccessResponse2<T> {
  status: 'success';
  res: AxiosResponse<T>;
}
export interface IHttpErrorResponse<T> {
  status: 'failure';
  error?: AxiosError<T>;
}

export interface IHttpActionResponse {
  [key: string]: unknown;
  status: 'success' | 'failure';
  message?: string;
}

export interface IQuery {
  [key: string]: unknown;
  limit?: number;
  page?: number;
  filters: IFilter[];
}

export type IQueryOperator = 'lte' | 'gte' | 'equals' | 'in' | 'near' | 'regex' | 'geometry';
export interface IFilter {
  name: string;
  operator?: IQueryOperator;
  value: string | string[] | number | number[] | ILocationFilter;
}

export interface ILocationFilter {
  lng?: number;
  lat?: number;
  zip?: string;
  maxDistance: number;
}

export interface ITokenPayload {
  email: string;
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}
