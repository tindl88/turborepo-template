import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';

import { USER_GENDER, USER_ROLE, USER_STATUS } from '../constants/user.constant';
import { UserPreference } from '../entities/user-preference.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'My Name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ammodesk@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '<PASSWORD>' })
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  locale?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  providerAccountId?: string;

  @ApiPropertyOptional({ example: AUTH_PROVIDER.CREDENTIALS })
  @IsOptional()
  provider?: AUTH_PROVIDER;

  @ApiPropertyOptional({ example: AUTH_TYPE.CREDENTIALS })
  @IsOptional()
  authType?: AUTH_TYPE;

  @ApiPropertyOptional({ enum: USER_GENDER, example: USER_GENDER.OTHER })
  @IsOptional()
  gender?: USER_GENDER;

  @ApiPropertyOptional({ enum: USER_STATUS, example: USER_STATUS.ACTIVE })
  @IsOptional()
  status: USER_STATUS;

  @ApiProperty({ enum: USER_ROLE, example: USER_ROLE.USER })
  @IsOptional()
  role: USER_ROLE;

  @IsOptional()
  preference?: UserPreference;
}
