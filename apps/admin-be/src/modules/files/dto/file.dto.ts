import { IsUUID } from 'class-validator';

export class FileDto {
  @IsUUID('4', { each: true })
  id: string;
}
