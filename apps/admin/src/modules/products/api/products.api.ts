import { EntityId } from '@reduxjs/toolkit';

import {
  CreateProductDto,
  ProductFilter,
  ProductResponse,
  ProductsResponse,
  UpdateProductDto
} from '../interfaces/products.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: ProductFilter) => {
  const url = API_ENDPOINTS.PRODUCTS + '?' + objectToQueryString(filter);

  return HttpRequest.get<ProductsResponse>(url);
};

export const create = (createProductDto: CreateProductDto) => {
  return HttpRequest.post<ProductResponse>(API_ENDPOINTS.PRODUCTS, createProductDto);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};

export const update = (id: EntityId, updateProductDto: UpdateProductDto) => {
  return HttpRequest.patch<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`, updateProductDto);
};

export const destroy = (id: EntityId) => {
  return HttpRequest.delete<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return HttpRequest.post<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/bulk-delete`, payload);
};

const ProductApi = { list, create, read, update, destroy, bulkDestroy };

export default ProductApi;
