import { EntityId } from '@reduxjs/toolkit';

import { PostFilter, PostResponse, PostsResponse } from '../interfaces/post.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const list = (_filter: PostFilter) => {
  const url = API_ENDPOINTS.POSTS;

  return axiosClient.get<PostsResponse>(url);
};

export const read = (id: EntityId) => {
  return axiosClient.get<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

const PostApi = { list, read };

export default PostApi;
