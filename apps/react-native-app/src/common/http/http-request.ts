import {AxiosRequestConfig} from 'axios';

import {axiosClient} from './http-interceptors';

export async function get<T>(url: string, options?: AxiosRequestConfig) {
  return axiosClient.get<T>(url, options);
}

export async function post<T>(url: string, data: unknown, options?: AxiosRequestConfig) {
  return axiosClient.post<T>(url, data, options);
}

export async function put<T>(id: string, data: unknown, options?: AxiosRequestConfig) {
  return axiosClient.put<T>(id, data, options);
}

export async function patch<T>(id: string, data: unknown, options?: AxiosRequestConfig) {
  return axiosClient.patch<T>(id, data, options);
}

export async function destroy<T>(id: string, options?: AxiosRequestConfig) {
  return axiosClient.delete<T>(id, options);
}

const HttpRequest = {get, post, put, patch, destroy};

export default HttpRequest;
