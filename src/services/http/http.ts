import axios, { AxiosRequestConfig } from 'axios';
import { IHttpResponse } from './http.types';

const axiosInstance = axios.create({
  timeout: 3000,
  baseURL: BASE_URL,
  withCredentials: true,
  responseType: 'json',
});

export const http = async (RequestOptions: AxiosRequestConfig): Promise<IHttpResponse> => {
  const { data } = await axiosInstance.request(RequestOptions);
  return data;
};
