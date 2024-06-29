import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { toSlug } from '@/common/utils/string.util';

import { IsEmptyOrUUID } from '@/common/validators/is-empty-or-uuid';

import { FileDto } from '@/modules/files/dto/file.dto';
import { File } from '@/modules/files/entities/file.entity';

import { POST_STATUS } from '../constants/post.constant';

export class CreatePostDto {
  @ApiProperty({ example: 'This is title of post' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: toSlug('This is title of post') })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ example: '<p>description</p>' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: '<p>body</p>' })
  @IsString()
  @IsOptional()
  body: string;

  @ApiPropertyOptional({ example: POST_STATUS.DRAFT })
  @IsString()
  @IsOptional()
  status: POST_STATUS;

  @ApiPropertyOptional({ description: 'File ID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @IsString()
  @IsOptional()
  cover: string;

  @ApiPropertyOptional({
    description: 'Array of file ID',
    example: [{ id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }, { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  images: File[];

  @ApiPropertyOptional({ description: 'Category ID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @IsOptional()
  @IsEmptyOrUUID()
  @IsString()
  categoryId: string;
}
