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
import { Checkbox } from '@ui/components/ui/checkbox';
import Pagination from '@ui/components/ui/pagination-custom';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { ProductEntity, ProductFilter } from '../interfaces/products.interface';

import { PRODUCT_ACTION, PRODUCT_DEFAULT_FILTER, PRODUCT_STATUSES } from '../constants/products.constant';

import { DataTable } from '@/components/common/data-table/data-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import DataTableItemsPerPage from '@/components/common/data-table/data-table-item-per-page';
import DataTableRowAction from '@/components/common/data-table/data-table-row-action';
import ModalConfirmDialog from '@/components/common/modal-confirm';
import PaginationInfo from '@/components/common/pagination-info';

import { toDateTime } from '@/utils';

import { useProductsState } from '../states/products.state';

import ProductListToolbar from './product-list-toolbar';
import ProductRowStatus from './product-row-status';

const ProductList: FC<ComponentBaseProps> = ({ className }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const productsState = useProductsState();
  const [action, setAction] = useState<{ name: string; data?: ProductEntity }>({
    name: ''
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { items, filter, meta, fetchedAt, filteredAt, deletedAt, isFetching, selected, selectSingle, selectAll } =
    productsState;
  const selectedIds = selected.reduce((row, id) => ({ ...row, [id]: true }), {});

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(selectedIds);

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/products/[id]/edit',
      params: { id },
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  const columns: ColumnDef<ProductEntity>[] = useMemo(
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
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('product_title')} />,
        cell: ({ row }) => {
          return (
            <div className="flex items-center space-x-1">
              <button className="text-left hover:underline" onClick={() => handleEdit(row.original.id)}>
                {row.getValue('name')}
              </button>
            </div>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        size: 0,
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('product_created_at')} />,
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt'));

          return <p className="text-muted-foreground text-sm">{toDateTime(date, locale)}</p>;
        }
      },
      {
        accessorKey: 'status',
        size: 0,
        header: ({ column }) => (
          <DataTableColumnHeader className="text-center" column={column} title={t('product_status')} />
        ),
        cell: ({ row }) => {
          const status = PRODUCT_STATUSES.find(x => x.value === row.getValue('status'));

          if (!status) return null;

          return (
            <div className="text-center">
              <ProductRowStatus status={status} />
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        }
      },
      {
        id: 'actions',
        size: 110,
        header: () => (
          <div className="text-center">
            <strong>{t('product_actions')}</strong>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <DataTableRowAction
              items={[
                { label: t('product_delete'), action: PRODUCT_ACTION.DELETE },
                {
                  label: t('product_auditlog'),
                  action: PRODUCT_ACTION.AUDIT_LOG
                }
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

  const getFilter = (): ProductFilter => {
    return {
      q: searchParams.get('q') || PRODUCT_DEFAULT_FILTER.q,
      page: parseInt(searchParams.get('page') as string) || PRODUCT_DEFAULT_FILTER.page,
      limit: parseInt(searchParams.get('limit') as string) || PRODUCT_DEFAULT_FILTER.limit,
      order: searchParams.get('order') || PRODUCT_DEFAULT_FILTER.order,
      status: searchParams.getAll('status') || PRODUCT_DEFAULT_FILTER.status
    };
  };

  useEffect(() => {
    const currentFilter = getFilter();

    if (filter) {
      const customFilter = {
        ...filter,
        sidebar: searchParams.get('sidebar')
      } as ProductFilter & { sidebar: string };

      router.push({ pathname: '/products', query: customFilter });

      productsState.listRequest({ filter });
    } else {
      productsState.setFilter(currentFilter);
    }
  }, [filteredAt]);

  useEffect(() => {
    if (productsState.deletedAt) table.resetRowSelection(false);
  }, [deletedAt]);

  return (
    <div
      className={classNames(
        'products-list bg-card text-card-foreground flex grow flex-col rounded-lg border p-4 shadow-sm',
        className
      )}
    >
      <div className="relative flex h-full grow flex-col">
        <ProductListToolbar table={table} onBulkDelete={() => setAction({ name: PRODUCT_ACTION.BULK_DELETE })} />
        <DataTable table={table} columns={columns} isFetching={isFetching || !fetchedAt} />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <DataTableItemsPerPage
            limit={filter?.limit}
            onFilter={value => productsState.setFilter({ page: 1, limit: +value })}
          />
          <PaginationInfo amount={meta?.paging?.totalItems} text={t('product_records')} />
        </div>
        <Pagination
          totalItems={meta?.paging?.totalItems || 0}
          currentPage={meta?.paging?.currentPage}
          itemPerPage={meta?.paging?.itemsPerPage}
          onChange={page => productsState.setFilter({ page })}
        />
      </div>
      <ModalConfirmDialog
        visible={action.name === PRODUCT_ACTION.DELETE}
        title="Delete"
        content={
          <>
            <span>Delete Product:</span>
            <strong className="text-primary">{action.data?.name}?</strong>
          </>
        }
        onYes={() => {
          productsState.destroyRequest(action.data?.id as string);
          setAction({ name: '' });
        }}
        onNo={() => setAction({ name: '' })}
      />
      <ModalConfirmDialog
        visible={action.name === PRODUCT_ACTION.BULK_DELETE}
        title="Bulk Delete"
        content={
          <>
            <span>Delete all selected products:</span>
            <strong className="text-primary">{action.data?.name}?</strong>
          </>
        }
        onYes={() => {
          productsState.bulkDestroyRequest({ ids: productsState.selected });
          setAction({ name: '' });
        }}
        onNo={() => setAction({ name: '' })}
      />
    </div>
  );
};

export default ProductList;
