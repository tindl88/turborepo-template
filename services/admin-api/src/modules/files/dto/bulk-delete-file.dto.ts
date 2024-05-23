import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class BulkDeleteFileDto {
  @ApiProperty({
    description: 'ids',
    example: ['xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx']
  })
  @IsArray()
  @IsUUID('4', { each: true })
  readonly ids: string[];
}
