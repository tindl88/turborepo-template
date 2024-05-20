import { EntityId } from '@reduxjs/toolkit';

import { CreateUserDto, UpdateUserDto, UserFilter, UserResponse, UsersResponse } from '../interfaces/users.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: UserFilter) => {
  const url = API_ENDPOINTS.USERS + '?' + objectToQueryString(filter);

  return HttpRequest.get<UsersResponse>(url);
};

export const create = (createUserDto: CreateUserDto) => {
  return HttpRequest.post<UserResponse>(API_ENDPOINTS.USERS, createUserDto);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`);
};

export const update = (id: EntityId, updateUserDto: UpdateUserDto) => {
  return HttpRequest.patch<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`, updateUserDto);
};

export const destroy = (id: EntityId) => {
  return HttpRequest.delete<UserResponse>(`${API_ENDPOINTS.USERS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return HttpRequest.post<UsersResponse>(`${API_ENDPOINTS.USERS}/bulk-delete`, payload);
};

const UserApi = { list, create, read, update, destroy, bulkDestroy };

export default UserApi;
