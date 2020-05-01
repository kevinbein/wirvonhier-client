export interface IHttpResponse {
  status: 'success' | 'failure';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
export interface IHttpActionResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  status: 'success' | 'failure';
  message?: string;
}

export interface IQuery {
  [key: string]: any;
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
