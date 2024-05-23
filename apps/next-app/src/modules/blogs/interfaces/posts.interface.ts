import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

export type PostEntity = {
  id: string;
  name: string;
  slug: string;
  description: string;
  body: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePostDto = Omit<PostEntity, 'id'>;
export type UpdatePostDto = Partial<CreatePostDto>;

export type PostsResponse = ResponseFormat<PostEntity[]>;
export type PostResponse = ResponseFormat<PostEntity>;

export type PostFilter = BaseFilter;
