import { ResponseError, ResponseMeta } from './api-response.interface';

export type ReduxBaseState = {
  isFetching?: boolean;
  isCreating?: boolean;
  isReading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  fetchedAt?: string;
  createdAt?: string;
  readedAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  filteredAt?: string;
  meta?: ResponseMeta;
} & ResponseError;
