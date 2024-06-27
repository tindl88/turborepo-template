import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Table } from '@tanstack/react-table';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { useRouter } from '@/navigation';

import { POST_DEFAULT_FILTER } from '../constants/posts.constant';

import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import DropdownBulkActions from '@/components/dropdown-bulk-actions';
import SearchBox from '@/components/search-box';

import { usePostsState } from '../states/posts.state';

import PostFilters from './post-filters';

type PostListToolbarProps<TData> = {
  table: Table<TData>;
  onBulkDelete?: () => void;
};

export default function PostListToolbar<TData>({ table, onBulkDelete }: PostListToolbarProps<TData>) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postsState = usePostsState();

  const handleAddNew = () => {
    router.push({
      pathname: '/posts/new',
      query: { sidebar: searchParams.get('sidebar') }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <PostFilters />
        <SearchBox value={postsState.filter?.q} onSearch={text => postsState.setFilter({ q: text })} />
        <Button variant="outline" onClick={() => postsState.setFilter(POST_DEFAULT_FILTER)}>
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
              disabled: !postsState.selected.length,
              onClick: onBulkDelete
            }
          ]}
          dropdownLabel={t('bulk_actions')}
        />
      </div>
    </div>
  );
}
