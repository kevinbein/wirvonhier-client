export interface IHttpResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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
