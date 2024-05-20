import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dtos/pagination.dto';

import { POST_STATUS } from '../constants/post.constant';

export class CreatePostSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create post successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of post',
      slug: 'this-is-title-of-post',
      description: 'Short content here',
      body: 'Full content here',
      status: POST_STATUS.DRAFT,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class GetPostsSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get posts successfully' })
  message: string;

  @ApiProperty({
    type: 'array',
    example: [
      {
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        name: 'This is title of post',
        slug: 'this-is-title-of-post',
        description: 'Short content here',
        body: 'Full content here',
        status: POST_STATUS.PUBLISHED,
        creator: {
          id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
          name: 'My Name'
        },
        createdAt: '2023-11-28T03:03:39.054Z',
        updatedAt: '2023-11-28T03:03:39.054Z'
      }
    ]
  })
  data: unknown[];

  @ApiProperty({
    example: {
      paging: {
        currentPage: 1,
        itemsPerPage: 1,
        totalItems: 4,
        totalPages: 4
      }
    }
  })
  meta: {
    paging: PaginationDto;
  };
}

export class GetPostSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get post successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of post',
      slug: 'this-is-title-of-post',
      description: 'Short content here',
      body: 'Full content here',
      status: POST_STATUS.PUBLISHED,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class GetPostFailureDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Post not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}

export class UpdatePostSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update post successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of post',
      slug: 'this-is-title-of-post',
      description: 'Short content here',
      body: 'Full content here',
      status: POST_STATUS.PUBLISHED,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class DeletePostSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete post successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of post',
      slug: 'this-is-title-of-post',
      description: 'Short content here',
      body: 'Full content here',
      status: POST_STATUS.DELETED,
      cover: 'house-21715252750924.jpeg',
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class BulkDeletePostsSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete posts successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: [
      { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', status: 'deleted' },
      { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', status: 'deleted' }
    ]
  })
  data: unknown;
}
