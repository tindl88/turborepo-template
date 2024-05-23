import { Pagination } from './pagination.interface';

export type ResponseMeta = {
  paging?: Pagination;
};

export type ResponseError = {
  message?: string | string[];
  statusCode?: number;
  error?: string;
};

export type ResponseFormat<T> = {
  data: T;
  meta?: ResponseMeta;
} & ResponseError;
