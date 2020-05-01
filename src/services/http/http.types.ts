import { AxiosError } from 'axios';

export interface IHttpSuccessResponse<T> {
  status: 'success';
  data: T;
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

export interface IFilter {
  name: string;
  operator?: string;
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
