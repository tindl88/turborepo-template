import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type AuditLogEntity = {
  id: string;
  tableName: string;
  recordId: string;
  user: UserEntity;
  action: string;
  oldValue: Record<string, unknown>;
  newValue: Record<string, unknown>;
  createdAt: string;
};

export type AuditLogsResponse = ResponseFormat<AuditLogEntity[]>;
export type AuditLogResponse = ResponseFormat<AuditLogEntity>;

export type AuditLogFilter = BaseFilter;
