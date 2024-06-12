import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({ example: '<DEVICE_TOKEN>' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'Noti Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Noti Content' })
  @IsNotEmpty()
  content: string;

  @IsOptional()
  topic: string;

  @IsOptional()
  image: string;

  @IsOptional()
  channelId: string;

  @IsOptional()
  sound: boolean;
}
