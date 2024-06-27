import { EntityId } from '@reduxjs/toolkit';
import { objectToQueryString } from '~shared-client/utils/querystring.util';

import { PostFilter, PostFormData, PostResponse, PostsResponse } from '../interfaces/posts.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { removeUndefined } from '@/utils/object.util';

import axiosClient from '@/http/http-request';

export const list = (filter: PostFilter) => {
  const url = API_ENDPOINTS.POSTS + '?' + objectToQueryString(removeUndefined(filter));

  return axiosClient.get<PostsResponse>(url);
};

export const create = (createPostDto: PostFormData) => {
  return axiosClient.post<PostResponse>(API_ENDPOINTS.POSTS, createPostDto);
};

export const read = (id: EntityId) => {
  return axiosClient.get<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

export const update = (id: EntityId, updatePostDto: PostFormData) => {
  return axiosClient.patch<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`, updatePostDto);
};

export const destroy = (id: EntityId) => {
  return axiosClient.delete<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return axiosClient.post<PostsResponse>(`${API_ENDPOINTS.POSTS}/bulk-delete`, payload);
};

const PostApi = { list, create, read, update, destroy, bulkDestroy };

export default PostApi;
