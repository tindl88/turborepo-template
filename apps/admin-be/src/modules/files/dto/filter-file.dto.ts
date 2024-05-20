import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { FILE_STATUS } from '../constants/file.constant';

export class FilterFileDto extends BaseFilterDto {
  @ApiPropertyOptional({ default: null })
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ default: null })
  @IsOptional()
  mime?: string;

  @ApiPropertyOptional({
    enum: FILE_STATUS,
    isArray: true,
    example: [FILE_STATUS.DELETED, FILE_STATUS.VISIBLED],
    default: [FILE_STATUS.VISIBLED]
  })
  @IsArray()
  @IsEnum(FILE_STATUS, { each: true })
  @IsOptional()
  status?: FILE_STATUS[];
}
