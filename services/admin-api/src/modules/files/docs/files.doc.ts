import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dtos/pagination.dto';

import { FILE_STATUS } from '../constants/file.constant';

export class UploadSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Upload successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      categoryId: '1b627bc6-3111-40ef-92a7-c416fb5517c7',
      files: [
        {
          name: 'Screenshot 2024-04-08 at 09.28.37.png',
          uniqueName: 'screenshot-2024-04-08-at-0928371712713735303',
          caption: 'Screenshot 2024-04-08 at 09.28.37.png',
          ext: '.png',
          size: 79262,
          mime: 'image/png',
          path: 'upload/FolderName/screenshot-2024-04-08-at-0928371712713735303.png'
        },
        {
          name: 'root.png',
          uniqueName: 'root1712713735303',
          caption: 'root.png',
          ext: '.png',
          size: 145121,
          mime: 'image/png',
          path: 'upload/FolderName/root1712713735303.png'
        }
      ]
    }
  })
  data: unknown;
}

export class UploadBadRequestDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.UNPROCESSABLE_ENTITY })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'File is required' })
  message: string;

  @ApiProperty({ type: String, example: 'Unprocessable Entity' })
  error: string;
}

export class GetFilesSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get files successfully' })
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
        status: FILE_STATUS.VISIBLED,
        creator: {
          id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
          name: 'My Name'
        },
        createdAt: '2023-11-28T03:03:39.054Z',
        updatedAt: '2023-11-28T03:03:39.054Z'
      }
    ]
  })
  data: File[];

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

export class DeleteFileSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete file successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: '340d60ca-90df-44f8-a463-37f14b0370b9',
      createdAt: '2024-04-15T01:54:36.225Z',
      updatedAt: '2024-04-15T01:58:00.986Z',
      name: 'next-js.1024x1024.png',
      uniqueName: 'next-js1024x10241713171276223.png',
      caption: 'next-js.1024x1024',
      ext: '.png',
      size: '40240',
      mime: 'image/png',
      isTemp: false,
      status: 'deleted'
    }
  })
  data: File;
}

export class DeleteFileBadRequestDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Param id must be an UUID value' })
  message: string;

  @ApiProperty({ type: String, example: 'Bad Request' })
  error: string;
}

export class GetFileFailureDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'File not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}

export class BulkDeleteFilesSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete files successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      ids: ['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx']
    }
  })
  data: unknown;
}
