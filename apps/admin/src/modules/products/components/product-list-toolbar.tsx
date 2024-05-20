import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Table } from '@tanstack/react-table';
import { Button } from '@ui/components/ui/button';

import { useRouter } from '@/navigation';

import { PRODUCT_DEFAULT_FILTER } from '../constants/products.constant';

import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options';
import DropdownBulkActions from '@/components/common/dropdown-bulk-actions';
import SearchBox from '@/components/common/search-box';

import { useProductsState } from '../states/products.state';

import ProductFilters from './product-filters';

type ProductListToolbarProps<TData> = {
  table: Table<TData>;
  onBulkDelete?: () => void;
};

export default function ProductListToolbar<TData>({ table, onBulkDelete }: ProductListToolbarProps<TData>) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsState = useProductsState();

  const handleAddNew = () => {
    router.push({
      pathname: '/products/new',
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <ProductFilters />
        <SearchBox value={productsState.filter?.q} onSearch={text => productsState.setFilter({ q: text })} />
        <Button variant="outline" onClick={() => productsState.setFilter(PRODUCT_DEFAULT_FILTER)}>
          {t('filter_reset')}
        </Button>
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={handleAddNew}>{t('add_new')}</Button>
        <DropdownBulkActions
          actions={[
            {
              label: t('bulk_actions_delete_selected_rows'),
              disabled: !productsState.selected.length,
              onClick: onBulkDelete
            }
          ]}
          dropdownLabel={t('bulk_actions')}
        />
      </div>
    </div>
  );
}
