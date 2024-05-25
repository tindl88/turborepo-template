import {EntityId} from '@reduxjs/toolkit';

import {API_ENDPOINTS} from '@/common/constants/api-endpoint.constant';

import HttpRequest from '@/common/http/http-request';

import {objectToQueryString} from '@/common/utils/querystring.util';

import {PostFilter, PostResponse, PostsResponse} from '../interfaces/post.interface';

export const list = (filter: PostFilter) => {
  let url = API_ENDPOINTS.POSTS + '?' + objectToQueryString(filter);

  url = url.replaceAll('status=ALL', '');

  return HttpRequest.get<PostsResponse>(url);
};

export const read = (id: EntityId) => {
  return HttpRequest.get<PostResponse>(`${API_ENDPOINTS.POSTS}/${id}`);
};

const PostApi = {list, read};

export default PostApi;
