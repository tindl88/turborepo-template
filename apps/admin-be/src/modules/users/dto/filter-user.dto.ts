import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { USER_STATUS } from '../constants/user.constant';

export class FilterUserDto extends BaseFilterDto {
  @ApiPropertyOptional({
    enum: USER_STATUS,
    isArray: true,
    example: [USER_STATUS.INACTIVE, USER_STATUS.ACTIVE],
    default: [USER_STATUS.INACTIVE]
  })
  @IsArray()
  @IsEnum(USER_STATUS, { each: true })
  @IsOptional()
  status?: USER_STATUS[];
}
