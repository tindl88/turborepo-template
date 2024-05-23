import { EntityId } from '@reduxjs/toolkit';

import { CreatePostDto, PostFilter, PostResponse, PostsResponse, UpdatePostDto } from '../interfaces/posts.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: PostFilter) => {
  const url = API_ENDPOINTS.POSTS + '?' + objectToQueryString(filter);

  return HttpRequest.get<PostsResponse>(url);
};

export const create = (createPostDto: CreatePostDto) => {
  return HttpRequest.post<PostResponse>(API_ENDPOINTS.POSTS, createPostDto);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

export const update = (id: EntityId, updatePostDto: UpdatePostDto) => {
  return HttpRequest.patch<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`, updatePostDto);
};

export const destroy = (id: EntityId) => {
  return HttpRequest.delete<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

export const bulkDestroy = (payload: { ids: EntityId[] }) => {
  return HttpRequest.post<PostsResponse>(`${API_ENDPOINTS.POSTS}/bulk-delete`, payload);
};

const PostApi = { list, create, read, update, destroy, bulkDestroy };

export default PostApi;
