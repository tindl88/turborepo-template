import { EntityId } from '@reduxjs/toolkit';
import { objectToQueryString } from '~shared-client/utils/querystring.util';

import { ProductFilter, ProductFormData, ProductResponse, ProductsResponse } from '../interfaces/products.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { removeUndefined } from '@/utils/object.util';

import axiosClient from '@/http/http-request';

export const list = (filter: ProductFilter) => {
  const url = API_ENDPOINTS.PRODUCTS + '?' + objectToQueryString(removeUndefined(filter));

  return axiosClient.get<ProductsResponse>(url);
};

export const create = (createProductDto: ProductFormData) => {
  return axiosClient.post<ProductResponse>(API_ENDPOINTS.PRODUCTS, createProductDto);
};

export const read = (id: EntityId) => {
  return axiosClient.get<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};

export const update = (id: EntityId, updateProductDto: ProductFormData) => {
  return axiosClient.patch<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`, updateProductDto);
};

export const destroy = (id: EntityId) => {
  return axiosClient.delete<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return axiosClient.post<ProductResponse>(`${API_ENDPOINTS.PRODUCTS}/bulk-delete`, payload);
};

const ProductApi = { list, create, read, update, destroy, bulkDestroy };

export default ProductApi;
