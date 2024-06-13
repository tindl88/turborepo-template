import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDeviceTokenDto {
  @ApiProperty({ example: '<DEVICE_TOKEN>' })
  @IsNotEmpty()
  deviceToken: string;
}
