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

import HttpRequest from '@/http/http-request';

export const list = (filter: CategoryFilter) => {
  const url = API_ENDPOINTS.CATEGORIES + '?' + objectToQueryString(filter);

  return HttpRequest.get<CategoriesResponse>(url);
};

export const create = (createCategoryDto: CreateCategoryDto) => {
  return HttpRequest.post<CategoryResponse>(API_ENDPOINTS.CATEGORIES, createCategoryDto);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
};

export const update = (id: EntityId, updateCategoryDto: UpdateCategoryDto) => {
  return HttpRequest.patch<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`, updateCategoryDto);
};

export const destroy = (id: EntityId) => {
  return HttpRequest.delete<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return HttpRequest.post<CategoryResponse>(`${API_ENDPOINTS.CATEGORIES}/bulk-delete`, payload);
};

const CategoryApi = { list, create, read, update, destroy, bulkDestroy };

export default CategoryApi;
