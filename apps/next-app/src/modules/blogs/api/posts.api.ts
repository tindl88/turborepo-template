import { EntityId } from '@reduxjs/toolkit';

import { PostEntity, PostFilter, PostResponse, PostsResponse } from '../interfaces/posts.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import { objectToQueryString } from '@/utils/querystring.util';

import HttpRequest from '@/http/http-request';

export const list = (filter: PostFilter) => {
  const url = [API_ENDPOINTS.POSTS];

  url.push(`?page=${filter.page}`);

  return HttpRequest.get<PostEntity[]>(url.join(''));
};

export const read = (id: EntityId) => {
  return HttpRequest.get<PostEntity>(`${API_ENDPOINTS.POSTS}/${id}`);
};

export async function getServerPosts(filter: PostFilter) {
  const q = '?' + objectToQueryString(filter);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.POSTS}${q}`, {
    next: { revalidate: 60 }
  });
  const json = await res.json();

  return json as PostsResponse;
}

export async function getServerPost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.POSTS}/.by.slug/${slug}`, {
    next: { revalidate: 60 }
  });
  const json = await res.json();

  return json as PostResponse;
}

const PostApi = {
  list,
  read,
  getServerPosts,
  getServerPost
};

export default PostApi;