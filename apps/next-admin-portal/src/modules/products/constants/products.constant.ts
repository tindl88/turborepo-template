import { CheckCircle2Icon, CircleSlashIcon, XCircleIcon } from 'lucide-react';

import { StatusType } from '@/interfaces/status.interface';
import { ProductFilter } from '../interfaces/products.interface';

export enum PRODUCT_STATUS {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted'
}

export enum PRODUCT_TYPE {
  UNCATEGORIZED = 'uncategorized',
  FILE = 'file'
}

export enum PRODUCT_ACTION {
  DELETE = 'delete',
  BULK_DELETE = 'bulk_delete',
  AUDIT_LOG = 'audit_log'
}

export const PRODUCT_DEFAULT_FILTER: ProductFilter = {
  q: '',
  page: 1,
  limit: 50,
  order: 'DESC',
  status: []
};

export const PRODUCT_STATUSES: StatusType[] = [
  {
    label: 'Published',
    value: PRODUCT_STATUS.PUBLISHED,
    textClassName: 'text-green-500',
    bgClassName: 'bg-green-500/10',
    borderClassName: 'border-green-400',
    activeClassName: 'after:bg-green-400',
    iconClassName: 'text-green-600',
    icon: CheckCircle2Icon
  },
  {
    label: 'Draft',
    value: PRODUCT_STATUS.DRAFT,
    textClassName: 'text-amber-500',
    bgClassName: 'bg-amber-500/10',
    borderClassName: 'border-amber-400',
    activeClassName: 'after:bg-amber-400',
    iconClassName: 'text-amber-600',
    icon: CircleSlashIcon
  },
  {
    label: 'Deleted',
    value: PRODUCT_STATUS.DELETED,
    textClassName: 'text-red-500',
    bgClassName: 'bg-red-500/10',
    borderClassName: 'border-red-400',
    activeClassName: 'after:bg-red-400',
    iconClassName: 'text-red-600',
    icon: XCircleIcon
  }
];
