import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { toSlug } from '@/common/utils/string.util';

import { FileDto } from '@/modules/files/dto/file.dto';
import { File } from '@/modules/files/entities/file.entity';

import { PRODUCT_STATUS } from '../constants/product.constant';

export class CreateProductDto {
  @ApiProperty({ example: 'This is title of product' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: toSlug('This is title of product') })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ example: '<p>body</p>' })
  @IsString()
  @IsOptional()
  body: string;

  @ApiPropertyOptional({ example: PRODUCT_STATUS.DRAFT })
  @IsString()
  @IsOptional()
  status: PRODUCT_STATUS;

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
}
