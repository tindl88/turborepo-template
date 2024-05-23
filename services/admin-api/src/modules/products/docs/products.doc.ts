import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dtos/pagination.dto';

import { PRODUCT_STATUS } from '../constants/product.constant';

export class CreateProductSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create product successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of product',
      slug: 'this-is-title-of-product',
      body: 'Full content here',
      status: PRODUCT_STATUS.DRAFT,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class GetProductsSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get products successfully' })
  message: string;

  @ApiProperty({
    type: 'array',
    example: [
      {
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        name: 'This is title of product',
        slug: 'this-is-title-of-product',
        body: 'Full content here',
        status: PRODUCT_STATUS.PUBLISHED,
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

export class GetProductSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get product successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of product',
      slug: 'this-is-title-of-product',
      body: 'Full content here',
      status: PRODUCT_STATUS.PUBLISHED,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class GetProductFailureDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Product not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}

export class UpdateProductSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update product successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of product',
      slug: 'this-is-title-of-product',
      body: 'Full content here',
      status: PRODUCT_STATUS.PUBLISHED,
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class DeleteProductSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete product successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      name: 'This is title of product',
      slug: 'this-is-title-of-product',
      body: 'Full content here',
      status: PRODUCT_STATUS.DELETED,
      cover: 'house-21715252750924.jpeg',
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: unknown;
}

export class BulkDeleteProductsSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete products successfully' })
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
