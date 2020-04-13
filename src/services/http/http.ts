import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { IHttpResponse, IQuery } from './http.types';

const withAuth = axios.create({
  timeout: 3000,
  baseURL: API_URL,
  withCredentials: true,
  responseType: 'json',
});

export class HTTP {
  private withAuth: AxiosInstance;

  constructor(withAuth: AxiosInstance) {
    this.withAuth = withAuth;
  }

  async get(url: string, options?: AxiosRequestConfig): Promise<IHttpResponse> {
    const res = await this.withAuth.get(url, options);
    return res.data;
  }

  public constructQueryString(query: IQuery): string {
    const queryArray = [];
    if (query.limit) queryArray.push(`limit=${query.limit}`);
    if (query.page) queryArray.push(`page=${query.page}`);
    if (query.filters) {
      for (const filter of query.filters) {
        let value = filter.value;
        value = value instanceof Array ? value.join('|') : value;
        value =
          typeof value === 'object' && filter.name === 'location'
            ? `${value.zip ? value.zip : value.lng + ',' + value.lat},${value.maxDistance}`
            : value;

        queryArray.push(`filter_${filter.name}=${filter.operator ? filter.operator + ':' : ''}${value}`);
      }
    }
    return queryArray.join('&');
  }
}

export const http = new HTTP(withAuth);
