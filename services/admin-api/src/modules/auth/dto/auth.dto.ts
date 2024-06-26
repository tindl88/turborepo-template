import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

export class SignInDto {
  @ApiProperty({ example: 'ammodesk@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ammodesk123@' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 50, { message: 'password has to be at between 6 and 50 chars' })
  password: string;
}

export class OAuthSignInDto {
  @ApiProperty({ example: '<TOKEN>' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ enum: AUTH_AUTHENTICATOR, default: AUTH_AUTHENTICATOR.SELF_HOSTED })
  @IsEnum(AUTH_AUTHENTICATOR)
  authenticator: AUTH_AUTHENTICATOR;
}

export class OAuthFacebookSignInDto extends OAuthSignInDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isFacebookLimited: boolean;
}
