import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SendNotificationDto {
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
