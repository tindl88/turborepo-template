import { CheckCircle2Icon, CircleSlashIcon, XCircleIcon } from 'lucide-react';

import { AuditLogFilter } from '../interfaces/audit-logs.interface';

export enum AUDIT_LOG_TABLE_NAME {
  USER = 'users',
  FILE = 'files',
  POST = 'posts',
  PRODUCT = 'product',
  CATEGORIE = 'categories'
}

export enum AUDIT_LOG_HTTP_METHOD {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export const AUDIT_LOG_DEFAULT_FILTER: AuditLogFilter = {
  page: 1,
  limit: 5
};

export const AUDIT_LOG_STATUSES = [
  {
    label: 'Create',
    value: AUDIT_LOG_HTTP_METHOD.CREATE,
    textClassName: 'text-green-500',
    bgClassName: 'bg-green-500/10',
    borderClassName: 'border-green-400',
    activeClassName: 'after:bg-green-400',
    iconClassName: 'text-green-600',
    icon: CheckCircle2Icon
  },
  {
    label: 'Update',
    value: AUDIT_LOG_HTTP_METHOD.UPDATE,
    textClassName: 'text-amber-500',
    bgClassName: 'bg-amber-500/10',
    borderClassName: 'border-amber-400',
    activeClassName: 'after:bg-amber-400',
    iconClassName: 'text-amber-600',
    icon: CircleSlashIcon
  },
  {
    label: 'Delete',
    value: AUDIT_LOG_HTTP_METHOD.DELETE,
    textClassName: 'text-red-500',
    bgClassName: 'bg-red-500/10',
    borderClassName: 'border-red-400',
    activeClassName: 'after:bg-red-400',
    iconClassName: 'text-red-600',
    icon: XCircleIcon
  }
];
