import { CheckCircle2Icon, CircleDotIcon, CircleOffIcon, CircleSlashIcon, XCircleIcon } from 'lucide-react';

import { UserFilter } from '../interfaces/users.interface';

export enum USER_GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum USER_ROLE {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user'
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  BLOCKED = 'blocked',
  NOT_VERIFIED = 'not_verified'
}

export enum USER_ACTION {
  DELETE = 'delete',
  BULK_DELETE = 'bulk_delete',
  AUDIT_LOG = 'audit_log'
}

export const USER_DEFAULT_FILTER: UserFilter = {
  q: '',
  page: 1,
  limit: 50,
  order: 'DESC',
  status: []
};

export const USER_STATUSES = [
  {
    label: 'Active',
    value: USER_STATUS.ACTIVE,
    textClassName: 'text-green-500',
    bgClassName: 'bg-green-500/10',
    borderClassName: 'border-green-400',
    activeClassName: 'after:bg-green-400',
    iconClassName: 'text-green-600',
    icon: CheckCircle2Icon
  },
  {
    label: 'Inactive',
    value: USER_STATUS.INACTIVE,
    textClassName: 'text-amber-500',
    bgClassName: 'bg-amber-500/10',
    borderClassName: 'border-amber-400',
    activeClassName: 'after:bg-amber-400',
    iconClassName: 'text-amber-600',
    icon: CircleSlashIcon
  },
  {
    label: 'Not Verified',
    value: USER_STATUS.NOT_VERIFIED,
    textClassName: 'text-cyan-500',
    bgClassName: 'bg-cyan-500/10',
    borderClassName: 'border-cyan-400',
    activeClassName: 'after:bg-cyan-400',
    iconClassName: 'text-cyan-600',
    icon: CircleDotIcon
  },
  {
    label: 'Blocked',
    value: USER_STATUS.BLOCKED,
    textClassName: 'text-slate-500',
    bgClassName: 'bg-slate-500/10',
    borderClassName: 'border-slate-400',
    activeClassName: 'after:bg-slate-400',
    iconClassName: 'text-slate-600',
    icon: CircleOffIcon
  },
  {
    label: 'Deleted',
    value: USER_STATUS.DELETED,
    textClassName: 'text-red-500',
    bgClassName: 'bg-red-500/10',
    borderClassName: 'border-red-400',
    activeClassName: 'after:bg-red-400',
    iconClassName: 'text-red-600',
    icon: XCircleIcon
  }
];
