import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { POST_STATUS } from '../constants/posts.constant';

import { FileEntity } from '@/modules/files/interfaces/files.interface';
import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type PostEntity = {
  id: string;
  name: string;
  slug: string;
  description: string;
  body: string;
  status: POST_STATUS;
  creator: UserEntity;
  cover: string;
  images: FileEntity[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePostDto = Omit<PostEntity, 'id'>;
export type UpdatePostDto = Partial<CreatePostDto>;

export type PostsResponse = ResponseFormat<PostEntity[]>;
export type PostResponse = ResponseFormat<PostEntity>;
export type BulkDeletePostResponse = PostResponse;

export type PostFilter = BaseFilter;
