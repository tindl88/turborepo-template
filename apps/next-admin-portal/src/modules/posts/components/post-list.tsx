import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import classNames from 'classnames';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';
import { Checkbox } from '~ui/components/ui/checkbox';
import Pagination from '~ui/components/ui/pagination-custom';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostEntity, PostFilter } from '../interfaces/posts.interface';

import { POST_ACTION, POST_DEFAULT_FILTER, POST_STATUSES } from '../constants/posts.constant';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import DataTableItemsPerPage from '@/components/data-table/data-table-item-per-page';
import DataTableRowAction from '@/components/data-table/data-table-row-action';
import ModalConfirm from '@/components/modals/modal-confirm';
import PaginationInfo from '@/components/pagination-info';

import { toDateTime } from '@/utils/date.util';

import { usePostsState } from '../states/posts.state';

import PostDialogDetail from './post-dialog-detail';
import PostListToolbar from './post-list-toolbar';
import PostRowStatus from './post-row-status';

const PostList: FC<ComponentBaseProps> = ({ className }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const postsState = usePostsState();
  const [viewDetailId, setViewDetailId] = useState('');
  const [action, setAction] = useState<{ name: string; data?: PostEntity }>({
    name: ''
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { items, filter, meta, fetchedAt, filteredAt, deletedAt, isFetching, selected, selectSingle, selectAll } =
    postsState;
  const selectedIds = selected.reduce((row, id) => ({ ...row, [id]: true }), {});

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(selectedIds);

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/posts/[id]/edit',
      params: { id },
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  const columns: ColumnDef<PostEntity>[] = useMemo(
    () => [
      {
        id: 'select',
        size: 48,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            aria-label="Select all"
            className="translate-y-[2px]"
            onCheckedChange={value => {
              table.toggleAllRowsSelected(!!value);
              selectAll(value ? items.map(x => x.id) : []);
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            defaultChecked={selected.includes(row.original.id)}
            checked={row.getIsSelected()}
            aria-label="Select row"
            className="translate-y-[2px]"
            onCheckedChange={value => {
              row.toggleSelected(!!value);
              selectSingle(row.original.id);
            }}
          />
        )
      },
      {
        accessorKey: 'name',
        size: 0,
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('post_title')} />,
        cell: ({ row }) => {
          return (
            <div className="flex items-center space-x-1">
              <button className="text-left hover:underline" onClick={() => handleEdit(row.original.id)}>
                {row.getValue('name')}
              </button>
              <button className="p-1.5" onClick={() => setViewDetailId(row.original.id)}>
                <span>(Detail)</span>
              </button>
            </div>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        size: 0,
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('post_created_at')} />,
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt'));

          return <p className="text-sm text-muted-foreground">{toDateTime(date, locale)}</p>;
        }
      },
      {
        accessorKey: 'status',
        size: 0,
        header: ({ column }) => (
          <DataTableColumnHeader className="text-center" column={column} title={t('post_status')} />
        ),
        cell: ({ row }) => {
          const status = POST_STATUSES.find(x => x.value === row.getValue('status'));

          if (!status) return null;

          return (
            <div className="text-center">
              <PostRowStatus status={status} />
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        }
      },
      {
        accessorKey: 'creator',
        size: 0,
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('post_author')} />,
        cell: ({ row }) => {
          const creator = row.original.creator;

          return (
            <div className="flex space-x-2">
              <div className="max-w-64 truncate leading-none">
                {creator && (
                  <>
                    <p className="text-sm">{creator.name}</p>
                    <p className="text-xs text-muted-foreground">{creator.email}</p>
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
            <strong>{t('post_actions')}</strong>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <DataTableRowAction
              items={[
                { label: t('post_delete'), action: POST_ACTION.DELETE },
                { label: t('post_auditlog'), action: POST_ACTION.AUDIT_LOG }
              ]}
              onAction={actionName => setAction({ name: actionName, data: row.original })}
            />
          </div>
        )
      }
    ],
    [items]
  );

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableColumnResizing: false,
    enableRowSelection: true,
    manualPagination: true,
    enableFilters: true,
    enableSorting: true,
    getRowId: row => row.id.toString(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const getFilter = (): PostFilter => {
    return {
      q: searchParams.get('q') || POST_DEFAULT_FILTER.q,
      page: parseInt(searchParams.get('page') as string) || POST_DEFAULT_FILTER.page,
      limit: parseInt(searchParams.get('limit') as string) || POST_DEFAULT_FILTER.limit,
      order: searchParams.get('order') || POST_DEFAULT_FILTER.order,
      status: searchParams.getAll('status') || POST_DEFAULT_FILTER.status
    };
  };

  useEffect(() => {
    const currentFilter = getFilter();

    if (filter) {
      const customFilter = {
        ...filter,
        sidebar: searchParams.get('sidebar')
      } as PostFilter & { sidebar: string };

      router.push({ pathname: '/posts', query: customFilter });

      postsState.listRequest({ filter });
    } else {
      postsState.setFilter(currentFilter);
    }
  }, [filteredAt]);

  useEffect(() => {
    if (postsState.deletedAt) table.resetRowSelection(false);
  }, [deletedAt]);

  return (
    <div
      className={classNames(
        'posts-list flex grow flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        className
      )}
    >
      <div className="relative flex h-full grow flex-col">
        <PostListToolbar table={table} onBulkDelete={() => setAction({ name: POST_ACTION.BULK_DELETE })} />
        <DataTable table={table} columns={columns} isFetching={isFetching || !fetchedAt} />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <DataTableItemsPerPage
            limit={filter?.limit}
            onFilter={value => postsState.setFilter({ page: 1, limit: +value })}
          />
          <PaginationInfo amount={meta?.paging?.totalItems} text={t('post_records')} />
        </div>
        <Pagination
          totalItems={meta?.paging?.totalItems || 0}
          currentPage={meta?.paging?.currentPage}
          itemPerPage={meta?.paging?.itemsPerPage}
          onChange={page => postsState.setFilter({ page })}
        />
      </div>
      <ModalConfirm
        visible={action.name === POST_ACTION.DELETE}
        title={t('delete')}
        content={
          <div className="space-x-1">
            <span>{t('post_delete_message')}</span>
            <strong>{action.data?.name}?</strong>
          </div>
        }
        onYes={() => {
          postsState.destroyRequest(action.data?.id as string);
          setAction({ name: '' });
        }}
        onNo={() => setAction({ name: '' })}
      />
      <ModalConfirm
        visible={action.name === POST_ACTION.BULK_DELETE}
        title={t('bulk_delete')}
        content={<span>{t('post_bulk_delete_message')}</span>}
        onYes={() => {
          postsState.bulkDestroyRequest({ ids: postsState.selected });
          setAction({ name: '' });
        }}
        onNo={() => setAction({ name: '' })}
      />
      <PostDialogDetail id={viewDetailId} visible={!!viewDetailId} onCancel={() => setViewDetailId('')} />
    </div>
  );
};

export default PostList;
