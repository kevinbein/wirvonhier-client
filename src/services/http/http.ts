import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import jwtDecode from 'jwt-decode';
import { IHttpResponse, IQuery, ITokenPayload } from './http.types';
import { IStore } from '@/store';

const withAuthInstance = axios.create({
  timeout: 3000,
  baseURL: API_URL,
  withCredentials: true,
  responseType: 'json',
});

export class HTTP {
  private withAuth: AxiosInstance;
  private store: IStore;

  constructor(store: IStore, withAuth: AxiosInstance = withAuthInstance) {
    this.withAuth = withAuth;
    this.store = store;
  }

  async get(url: string, withAuth?: boolean, options?: AxiosRequestConfig): Promise<IHttpResponse> {
    if (withAuth) await this.checkAndRefreshToken();
    const opts: AxiosRequestConfig = { headers: {}, ...options };
    if (this.store.state.token) {
      opts.headers.Authentication = `Bearer ${this.store.state.token}`;
    }
    const res = await this.withAuth.get(url, opts);
    return res.data;
  }

  async post(url: string, data: unknown, withAuth?: boolean): Promise<IHttpResponse> {
    if (withAuth) await this.checkAndRefreshToken();
    const options: AxiosRequestConfig = { headers: {} };
    if (this.store.state.token) {
      options.headers.Authentication = `Bearer ${this.store.state.token}`;
    }
    const res = await this.withAuth.post(url, data, options);
    return res.data;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async checkAndRefreshToken(): Promise<void> {
    const token = this.store.state.token;
    if (token) {
      const decoded = jwtDecode<ITokenPayload>(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (!isExpired) return;
    }
    try {
      const res = await this.withAuth.post('/refresh-token');
      this.store.commit('SET_TOKEN', res.data.token);
    } catch (_error) {
      // User not authenticated possibly redirect to login
    }
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
