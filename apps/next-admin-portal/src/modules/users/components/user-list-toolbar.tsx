import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Table } from '@tanstack/react-table';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { useRouter } from '@/navigation';

import { USER_DEFAULT_FILTER } from '../constants/users.constant';

import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import DropdownBulkActions from '@/components/dropdown-bulk-actions';
import SearchBox from '@/components/search-box';

import { useUsersState } from '../states/users.state';

import UserFilters from './user-filters';

type UserListToolbarProps<TData> = {
  table: Table<TData>;
  onBulkDelete?: () => void;
};

export default function UserListToolbar<TData>({ table, onBulkDelete }: UserListToolbarProps<TData>) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const usersState = useUsersState();

  const handleAddNew = () => {
    router.push({
      pathname: '/users/new',
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <UserFilters />
        <SearchBox value={usersState.filter?.q} onSearch={text => usersState.setFilter({ q: text })} />
        <Button variant="outline" onClick={() => usersState.setFilter(USER_DEFAULT_FILTER)}>
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
              disabled: !usersState.selected.length,
              onClick: onBulkDelete
            }
          ]}
          dropdownLabel={t('bulk_actions')}
        />
      </div>
    </div>
  );
}
