import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { POST_STATUS } from '../constants/post.constant';

export class FilterPostDto extends BaseFilterDto {
  @ApiPropertyOptional({
    enum: POST_STATUS,
    isArray: true,
    example: [POST_STATUS.DRAFT, POST_STATUS.PUBLISHED],
    default: [POST_STATUS.DRAFT]
  })
  @IsArray()
  @IsEnum(POST_STATUS, { each: true })
  @IsOptional()
  status?: POST_STATUS[];
}
