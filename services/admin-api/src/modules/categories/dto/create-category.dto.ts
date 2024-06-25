import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { toSlug } from '@/common/utils/string.util';

import { CATEGORY_STATUS, CATEGORY_TYPE } from '../constants/category.constant';

export class CreateCategoryDto {
  @ApiProperty({ example: 'New Category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: toSlug('new-category') })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiPropertyOptional({ enum: CATEGORY_TYPE, example: CATEGORY_TYPE.UNCATEGORIZED })
  @IsOptional()
  type: CATEGORY_TYPE;

  @ApiPropertyOptional({ enum: CATEGORY_STATUS, example: CATEGORY_STATUS.VISIBLED })
  @IsOptional()
  status: CATEGORY_STATUS;

  @ApiPropertyOptional({ description: 'Category ID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @IsOptional()
  parentId?: string | null;
}
