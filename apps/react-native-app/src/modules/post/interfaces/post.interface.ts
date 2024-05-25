import {BaseFilter, ResponseFormat} from '@/common/interfaces';

export type PostEntity = {
  id: number;
  name: string;
  url: string;
  description: string;
  body: string;
  creator: any;
};

export type PostsResponse = ResponseFormat<PostEntity[]>;
export type PostResponse = ResponseFormat<PostEntity>;

export type PostFilter = BaseFilter;
