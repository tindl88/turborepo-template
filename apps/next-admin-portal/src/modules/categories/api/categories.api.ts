import { EntityId } from '@reduxjs/toolkit';
import { objectToQueryString } from '~shared-client/utils/querystring.util';

import {
  CategoriesResponse,
  CategoryFilter,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto
} from '../interfaces/categories.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const list = (filter: CategoryFilter) => {
  const url = API_ENDPOINTS.CATEGORIES + '?' + objectToQueryString(filter);

  return axiosClient.get<CategoriesResponse>(url);
};

export const create = (createCategoryDto: CreateCategoryDto) => {
  return axiosClient.post<CategoryResponse>(API_ENDPOINTS.CATEGORIES, createCategoryDto);
};

export const read = (id: EntityId) => {
  return axiosClient.get<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
};

export const update = (id: EntityId, updateCategoryDto: UpdateCategoryDto) => {
  return axiosClient.patch<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`, updateCategoryDto);
};

export const destroy = (id: EntityId) => {
  return axiosClient.delete<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return axiosClient.post<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/bulk-delete`, payload);
};

const CategoryApi = { list, create, read, update, destroy, bulkDestroy };

export default CategoryApi;
