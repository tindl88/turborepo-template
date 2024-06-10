import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

export type PostEntity = {
  id: number;
  name: string;
  url: string;
  description: string;
  body: string;
  // FIXME: Fix user type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  creator: any;
};

export type PostsResponse = ResponseFormat<PostEntity[]>;
export type PostResponse = ResponseFormat<PostEntity>;

export type PostFilter = BaseFilter;
