import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadDto {
  @ApiPropertyOptional()
  @IsOptional()
  categoryId?: string;
}
