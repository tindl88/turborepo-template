import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from '../entities/category.entity';

export class CreateCategorySuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create category successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      name: 'Nokia',
      parent: null,
      updatedAt: '2024-04-13T20:47:57.354Z',
      id: 'a2914bc1-2935-4804-9973-f4edb67df3b8',
      createdAt: '2024-04-13T20:47:57.354Z',
      type: 'uncategorized',
      status: 'visibled'
    }
  })
  data: unknown;
}

export class GetCategoryTreesSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get category tree successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: [
      {
        id: 'dc851280-891f-41f4-b763-6b49c457918f',
        createdAt: '2024-04-13T20:46:03.120Z',
        name: 'Phone',
        status: 'visibled',
        parent: null,
        children: [
          {
            id: 'a2914bc1-2935-4804-9973-f4edb67df3b8',
            createdAt: '2024-04-13T20:47:57.354Z',
            name: 'Nokia',
            status: 'visibled',
            parent: {
              id: 'dc851280-891f-41f4-b763-6b49c457918f',
              createdAt: '2024-04-13T20:46:03.120Z',
              updatedAt: '2024-04-13T20:46:03.120Z',
              name: 'Phone',
              type: 'uncategorized',
              status: 'visibled'
            },
            children: null,
            path: '/Phone/Nokia',
            depth: 1
          }
        ],
        path: '/Phone'
      }
    ]
  })
  data: unknown;
}

export class GetCategoriesSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get categories successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: [
      {
        id: 'dc851280-891f-41f4-b763-6b49c457918f'
      }
    ]
  })
  data: unknown;
}

export class GetCategorySuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get category successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'dc851280-891f-41f4-b763-6b49c457918f',
      createdAt: '2024-04-13T20:46:03.120Z',
      updatedAt: '2024-04-13T20:46:03.120Z',
      name: 'Phone',
      type: 'uncategorized',
      status: 'visibled',
      parent: null
    }
  })
  data: Category;
}

export class UpdateCategorySuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get category successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'a2914bc1-2935-4804-9973-f4edb67df3b8',
      createdAt: '2024-04-13T20:47:57.354Z',
      updatedAt: '2024-04-13T21:24:46.343Z',
      name: 'Nokia',
      type: 'uncategorized',
      status: 'visibled'
    }
  })
  data: unknown;
}

export class RemoveCategorySuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Remove category successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'a2914bc1-2935-4804-9973-f4edb67df3b8',
      createdAt: '2024-04-13T20:47:57.354Z',
      updatedAt: '2024-04-13T21:17:33.571Z',
      name: 'Nokia',
      type: 'uncategorized',
      status: 'deleted'
    }
  })
  data: unknown;
}

export class CreateCategoryConflictDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CONFLICT })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Category with the same name already exists.' })
  message: string;

  @ApiProperty({ type: String, example: 'Conflict' })
  error: string;
}

export class GetCategoryFailureDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Category not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}

export class BulkDeleteCategoriesSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete categories successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      ids: ['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx']
    }
  })
  data: unknown;
}
