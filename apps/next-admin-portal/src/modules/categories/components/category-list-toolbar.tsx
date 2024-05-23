import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Table } from '@tanstack/react-table';
import { Button } from '~ui/components/ui/button';

import { useRouter } from '@/navigation';

import { CATEGORY_DEFAULT_FILTER } from '../constants/categories.constant';

import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options';
import DropdownBulkActions from '@/components/common/dropdown-bulk-actions';
import SearchBox from '@/components/common/search-box';

import { useCategoriesState } from '../states/categories.state';

import CategoryFilters from './category-filters';

type CategoryListToolbarProps<TData> = {
  table: Table<TData>;
  onBulkDelete?: () => void;
};

export default function CategoryListToolbar<TData>({ table, onBulkDelete }: CategoryListToolbarProps<TData>) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesState = useCategoriesState();

  const handleAddNew = () => {
    router.push({
      pathname: '/categories/new',
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <CategoryFilters />
        <SearchBox value={categoriesState.filter?.q} onSearch={text => categoriesState.setFilter({ q: text })} />
        <Button variant="outline" onClick={() => categoriesState.setFilter(CATEGORY_DEFAULT_FILTER)}>
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
              disabled: !categoriesState.selected.length,
              onClick: onBulkDelete
            }
          ]}
          dropdownLabel={t('bulk_actions')}
        />
      </div>
    </div>
  );
}
