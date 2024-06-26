import { EntityId } from '@reduxjs/toolkit';

import { UserFilter, UserFormData, UserResponse, UsersResponse } from '../interfaces/users.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

import { removeUndefined } from '~shared-universal/utils/object.util';
import { objectToQueryString } from '~shared-universal/utils/string.util';

export const list = (filter: UserFilter) => {
  const url = API_ENDPOINTS.USERS + '?' + objectToQueryString(removeUndefined(filter));

  return axiosClient.get<UsersResponse>(url);
};

export const create = (createUserDto: UserFormData) => {
  return axiosClient.post<UserResponse>(API_ENDPOINTS.USERS, createUserDto);
};

export const read = (id: EntityId) => {
  return axiosClient.get<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`);
};

export const update = (id: EntityId, updateUserDto: UserFormData) => {
  return axiosClient.patch<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`, updateUserDto);
};

export const destroy = (id: EntityId) => {
  return axiosClient.delete<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return axiosClient.post<UsersResponse>(`${API_ENDPOINTS.USERS}/bulk-delete`, payload);
};

const UserApi = { list, create, read, update, destroy, bulkDestroy };

export default UserApi;
