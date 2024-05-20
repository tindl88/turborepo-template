import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, IsUUID } from 'class-validator';

import { UserDto } from '@/modules/users/dto/user.dto';

import { AUDIT_LOG_HTTP_METHOD, AUDIT_LOG_TABLE_NAME } from '../constants/audit-log.constant';

export class CreateAuditLogDto {
  @ApiProperty({ example: AUDIT_LOG_TABLE_NAME.POST })
  @IsString()
  tableName: AUDIT_LOG_TABLE_NAME;

  @ApiProperty({ example: { id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' } })
  user: UserDto;

  @ApiProperty()
  @IsString()
  @IsUUID('4')
  recordId: string;

  @ApiProperty({ example: AUDIT_LOG_HTTP_METHOD.CREATE })
  @IsString()
  action: AUDIT_LOG_HTTP_METHOD;

  @ApiProperty()
  @IsObject()
  oldValue: Record<string, unknown>;

  @ApiProperty()
  @IsObject()
  newValue: Record<string, unknown>;
}
