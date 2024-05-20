import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
