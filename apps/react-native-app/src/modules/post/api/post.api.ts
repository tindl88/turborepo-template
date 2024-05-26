import { EntityId } from '@reduxjs/toolkit';
import { objectToQueryString } from '~shared-client/utils/querystring.util';

import { PostFilter, PostResponse, PostsResponse } from '../interfaces/post.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import HttpRequest from '@/http/http-request';

export const list = (filter: PostFilter) => {
  const url = API_ENDPOINTS.POSTS + '?' + objectToQueryString(filter);

  return HttpRequest.get<PostsResponse>(url);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

const PostApi = { list, read };

export default PostApi;
