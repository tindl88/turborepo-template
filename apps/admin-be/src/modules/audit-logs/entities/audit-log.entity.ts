import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { User } from '@/modules/users/entities/user.entity';

import { AUDIT_LOG_HTTP_METHOD, AUDIT_LOG_TABLE_NAME } from '../constants/audit-log.constant';

@Entity({ name: 'audit_logs' })
export class AuditLog extends AbstractEntity {
  @Column({ type: 'enum', enum: AUDIT_LOG_TABLE_NAME })
  tableName: AUDIT_LOG_TABLE_NAME;

  @ManyToOne(() => User, user => user.auditLogs)
  user: User;

  @Column({ type: 'varchar' })
  recordId: string;

  @Column({ type: 'enum', enum: AUDIT_LOG_HTTP_METHOD })
  action: AUDIT_LOG_HTTP_METHOD;

  @Column({ type: 'jsonb' })
  oldValue: Record<string, unknown>;

  @Column({ type: 'jsonb' })
  newValue: Record<string, unknown>;
}
