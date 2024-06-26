import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { CATEGORY_STATUS, CATEGORY_TYPE } from '../constants/category.constant';

export class FilterCategoryDto extends BaseFilterDto {
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    enum: CATEGORY_STATUS,
    isArray: true,
    example: [CATEGORY_STATUS.VISIBLED, CATEGORY_STATUS.DELETED],
    default: [CATEGORY_STATUS.VISIBLED]
  })
  @IsArray()
  @IsEnum(CATEGORY_STATUS, { each: true })
  @IsOptional()
  status?: CATEGORY_STATUS[];

  @ApiPropertyOptional({ enum: CATEGORY_TYPE, default: CATEGORY_TYPE.UNCATEGORIZED })
  @IsEnum(CATEGORY_TYPE)
  @IsOptional()
  type?: CATEGORY_TYPE;

  @ApiPropertyOptional({ description: 'Category ID', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @IsOptional()
  @IsString()
  excludeId?: string;
}
