import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import jwtDecode from 'jwt-decode';
import { IQuery, ITokenPayload, IHttpSuccessResponse, IHttpErrorResponse, IHttpSuccessResponse2 } from './http.types';
import { IStore } from '@/store';

const withAuthInstance = axios.create({
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

  public isSuccessful<T>(
    response: IHttpSuccessResponse<T> | IHttpErrorResponse<T>,
  ): response is IHttpSuccessResponse<T> {
    return response.status === 'success';
  }

  async get<T>(
    url: string,
    withAuth?: boolean,
    options?: AxiosRequestConfig,
  ): Promise<IHttpSuccessResponse<T> | IHttpErrorResponse<T>> {
    if (withAuth) {
      const authenticated = await this.checkAndRefreshToken();
      if (!authenticated) return { status: 'failure' };
    }
    const opts: AxiosRequestConfig = { headers: {}, ...options };
    if (this.store.state.Auth.token && opts.withCredentials !== false) {
      opts.headers.Authentication = `Bearer ${this.store.state.Auth.token}`;
    }
    try {
      const { data } = await this.withAuth.get<T>(url, opts);
      return { status: 'success', data };
    } catch (e) {
      return { status: 'failure', error: e };
    }
  }

  async post<T>(
    url: string,
    body?: unknown,
    withAuth?: boolean,
    requestOptions?: AxiosRequestConfig,
  ): Promise<IHttpSuccessResponse<T> | IHttpErrorResponse<T>> {
    if (withAuth) {
      const authenticated = await this.checkAndRefreshToken();
      if (!authenticated) return { status: 'failure' };
    }
    const options: AxiosRequestConfig = { headers: {}, ...(requestOptions || {}) };
    if (this.store.state.Auth.token && options.withCredentials !== false) {
      options.headers.Authentication = `Bearer ${this.store.state.Auth.token}`;
    }
    try {
      const { data } = await this.withAuth.post<T>(url, body, options);
      return { status: 'success', data };
    } catch (e) {
      return { status: 'failure', error: e };
    }
  }

  async patch<T>(
    url: string,
    body?: unknown,
    withAuth?: boolean,
    requestOptions?: AxiosRequestConfig,
  ): Promise<IHttpSuccessResponse<T> | IHttpErrorResponse<T>> {
    if (withAuth) {
      const authenticated = await this.checkAndRefreshToken();
      if (!authenticated) return { status: 'failure' };
    }
    const options: AxiosRequestConfig = { headers: {}, ...(requestOptions || {}) };
    if (this.store.state.Auth.token && options.withCredentials !== false) {
      options.headers.Authentication = `Bearer ${this.store.state.Auth.token}`;
    }
    try {
      const { data } = await this.withAuth.patch<T>(url, body, options);
      return { status: 'success', data };
    } catch (e) {
      return { status: 'failure', error: e };
    }
  }

  async delete<T>(
    url: string,
    withAuth?: boolean,
    requestOptions?: AxiosRequestConfig,
  ): Promise<IHttpSuccessResponse<T> | IHttpErrorResponse<T>> {
    if (withAuth) {
      const authenticated = await this.checkAndRefreshToken();
      if (!authenticated) return { status: 'failure' };
    }
    const options: AxiosRequestConfig = { headers: {}, ...(requestOptions || {}) };
    if (this.store.state.Auth.token && options.withCredentials !== false) {
      options.headers.Authentication = `Bearer ${this.store.state.Auth.token}`;
    }
    try {
      const { data } = await this.withAuth.delete<T>(url, options);
      return { status: 'success', data };
    } catch (e) {
      return { status: 'failure', error: e };
    }
  }

  async head<T>(
    url: string,
    withAuth?: boolean,
    requestOptions?: AxiosRequestConfig,
  ): Promise<IHttpSuccessResponse2<T> | IHttpErrorResponse<T>> {
    if (withAuth) {
      const authenticated = await this.checkAndRefreshToken();
      if (!authenticated) return { status: 'failure' };
    }
    const options: AxiosRequestConfig = { headers: {}, ...(requestOptions || {}) };
    if (this.store.state.Auth.token && options.withCredentials !== false) {
      options.headers.Authentication = `Bearer ${this.store.state.Auth.token}`;
    }
    try {
      const res = await this.withAuth.head<T>(url, options);
      return { status: 'success', res };
    } catch (e) {
      return { status: 'failure', error: e };
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async checkAndRefreshToken(): Promise<boolean> {
    const hasPublicToken = document.cookie.includes('public_refresh_token');
    if (!hasPublicToken) return false;
    const token = this.store.state.Auth.token;
    if (token) {
      const decoded = jwtDecode<ITokenPayload>(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (!isExpired) return true;
    }
    try {
      const res = await this.withAuth.post<{ token: string }>('/refresh-token');
      this.store.commit('Auth/SET_TOKEN', res.data.token);
      return true;
    } catch (_error) {
      // User not authenticated possibly redirect to login
      return false;
    }
  }

  public constructQueryString(query: IQuery): string {
    const queryArray = [];
    if (query.limit) queryArray.push(`limit=${query.limit}`);
    if (typeof query.page === 'number') queryArray.push(`page=${query.page}`);
    if (query.filters) {
      for (const filter of query.filters) {
        let value = filter.value;
        value = Array.isArray(value) ? value.join('|') : value;
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
