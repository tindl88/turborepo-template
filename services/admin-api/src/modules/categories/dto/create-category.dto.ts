import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CATEGORY_STATUS, CATEGORY_TYPE } from '../constants/category.constant';

export class CreateCategoryDto {
  @ApiProperty({ example: 'New Category' })
  @IsNotEmpty()
  name: string;

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
