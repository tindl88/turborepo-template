import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({ example: 'My Name' })
  @IsNotEmpty()
  name: string;
}
