import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'ammodesk@gmail.com' })
  @IsEmail()
  readonly email: string;
}
