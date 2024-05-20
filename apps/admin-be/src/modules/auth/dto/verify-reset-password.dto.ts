import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class VerifyResetPasswordDto {
  @ApiProperty({ example: 'ammodesk@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '01234' })
  @IsString()
  readonly code: string;
}
