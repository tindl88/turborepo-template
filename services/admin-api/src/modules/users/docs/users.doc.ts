import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dtos/pagination.dto';

export class CreateUserSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
  })
  data: unknown;
}

export class GetUsersSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get users successfully' })
  message: string;

  @ApiProperty({
    type: 'array',
    example: [
      {
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
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

export class GetUserSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
  })
  data: unknown;
}

export class GetUserFailureDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'User not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}

export class UpdateUserSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
  })
  data: unknown;
}

export class DeleteUserSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
  })
  data: unknown;
}

export class BulkDeleteUsersSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      ids: ['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx']
    }
  })
  data: unknown;
}

export class UpdateUserProfileSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update user successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      createdAt: '2024-05-22T18:05:38.151Z',
      updatedAt: '2024-06-02T04:57:08.360Z',
      name: 'My Name',
      email: 'ammodesk@gmail.com',
      avatar: null,
      phoneNumber: null,
      emailVerified: null,
      recoveryCode: null,
      recoveredAt: null,
      locale: null,
      lastLogin: null,
      providerAccountId: null,
      provider: 'credentials',
      authType: 'credentials',
      gender: 'other',
      status: 'active',
      role: 'admin'
    }
  })
  data: unknown;
}

export class GetUserProfileSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get user profile successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      createdAt: '2024-05-22T18:05:38.151Z',
      name: 'Ammodesk',
      email: 'ammodesk@gmail.com',
      avatar: null,
      phoneNumber: null,
      lastLogin: null,
      status: 'active',
      role: 'admin'
    }
  })
  data: unknown;
}

export class UpdateUserDeviceTokenSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update user device token successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }
  })
  data: unknown;
}
