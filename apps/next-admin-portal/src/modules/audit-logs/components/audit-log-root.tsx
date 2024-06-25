'use client';

import { FC, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import classNames from 'classnames';
import { EyeIcon } from 'lucide-react';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Badge } from '~ui/components/ui/badge';
import Pagination from '~ui/components/ui/pagination-custom';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { AuditLogEntity } from '../interfaces/audit-logs.interface';

import { AUDIT_LOG_STATUSES } from '../constants/audit-logs.constant';

import { useAuditLogs } from '../hooks/use-audit-logs';

import { DataTable } from '@/components/common/data-table/data-table';
import DataTableItemsPerPage from '@/components/common/data-table/data-table-item-per-page';
import DataTableRowStatus from '@/components/common/data-table/data-table-row-status';
import PaginationInfo from '@/components/common/pagination-info';

import { toDateTime } from '@/utils/date.util';

import AuditLogDetail from './audit-log-detail';

type AuditLogRootProps = {
  items?: AuditLogEntity[];
} & ComponentBaseProps;

export const AuditLogRoot: FC<AuditLogRootProps> = ({ className }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { items, meta, filter, isFetching, setFilter } = useAuditLogs();
  const [viewDetailId, setViewDetailId] = useState('');
  const columns: ColumnDef<AuditLogEntity>[] = useMemo(
    () => [
      {
        accessorKey: 'tableName',
        size: 100,
        header: () => <strong>{t('audit_log_table_name')}</strong>,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-center">
              <Badge className="text-xs" variant="secondary">
                {row.original.tableName.toUpperCase()}
              </Badge>
            </div>
          );
        }
      },
      {
        accessorKey: 'recordId',
        size: 350,
        header: () => <strong>{t('audit_log_record_id')}</strong>,
        cell: ({ row }) => {
          return <div className="flex items-start space-x-3">{row.getValue('recordId')}</div>;
        }
      },
      {
        accessorKey: 'action',
        size: 130,
        header: () => <strong>{t('audit_log_action')}</strong>,
        cell: ({ row }) => {
          const status = AUDIT_LOG_STATUSES.find(x => x.value === row.getValue('action'));

          return (
            <div className="text-center">
              <DataTableRowStatus status={status} />
            </div>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        size: 200,
        header: () => <strong>{t('audit_log_created_at')}</strong>,
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt'));

          return <p className="text-sm text-muted-foreground">{toDateTime(date, locale)}</p>;
        }
      },
      {
        accessorKey: 'user',
        size: 300,
        header: () => <strong>{t('audit_log_user')}</strong>,
        cell: ({ row }) => {
          const user = row.original.user;

          return (
            <div className="flex space-x-2">
              <div className="max-w-64 truncate leading-none">
                {user && (
                  <>
                    <p className="text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </>
                )}
              </div>
            </div>
          );
        }
      },
      {
        id: 'actions',
        size: 110,
        header: () => (
          <div className="text-center">
            <strong>{t('audit_log_actions')}</strong>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <button className="p-1.5" onClick={() => setViewDetailId(row.original.id)}>
              <EyeIcon size={16} />
            </button>
          </div>
        )
      }
    ],
    [items]
  );

  const table = useReactTable({
    data: items,
    columns,
    enableColumnResizing: false,
    manualPagination: true,
    getRowId: row => row.id.toString(),
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div
      className={classNames(
        'audit-logs-list flex grow flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        className
      )}
    >
      <div className="relative flex h-full grow flex-col">
        <DataTable table={table} columns={columns} isFetching={isFetching} />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <DataTableItemsPerPage
            limit={filter?.limit}
            onFilter={value => setFilter({ ...filter, page: 1, limit: +value })}
          />
          <PaginationInfo amount={meta?.paging?.totalItems} text={t('audit_log_records')} />
        </div>
        <Pagination
          totalItems={meta?.paging?.totalItems}
          currentPage={meta?.paging?.currentPage}
          itemPerPage={meta?.paging?.itemsPerPage}
          onChange={page => setFilter({ ...filter, page })}
        />
      </div>
      <AuditLogDetail id={viewDetailId} visible={!!viewDetailId} onCancel={() => setViewDetailId('')} />
    </div>
  );
};
