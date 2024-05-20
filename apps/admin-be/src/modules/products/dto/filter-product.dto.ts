import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { PRODUCT_STATUS } from '../constants/product.constant';

export class FilterProductDto extends BaseFilterDto {
  @ApiPropertyOptional({
    enum: PRODUCT_STATUS,
    isArray: true,
    example: [PRODUCT_STATUS.DRAFT, PRODUCT_STATUS.PUBLISHED],
    default: [PRODUCT_STATUS.DRAFT]
  })
  @IsArray()
  @IsEnum(PRODUCT_STATUS, { each: true })
  @IsOptional()
  status?: PRODUCT_STATUS[];
}
