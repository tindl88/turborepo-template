import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

export class FilterAuditLogDto extends BaseFilterDto {
  user: string;
  tableName: string;
  recordId: string;
}
