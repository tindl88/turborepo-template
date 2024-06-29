import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { Loading } from '~react-web-ui-shadcn/components/ui/loading';
import Pagination from '~react-web-ui-shadcn/components/ui/pagination-custom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~react-web-ui-shadcn/components/ui/resizable';
import { useToast } from '~react-web-ui-shadcn/components/ui/use-toast';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity, FileFilter } from '../interfaces/files.interface';

import {
  DEFAULT_FILTER,
  MAX_FILE_SIZE_IN_BYTES,
  MAX_FILES_TO_UPLOAD,
  VALID_ALL_MIME_TYPES
} from '../constants/files.constant';

import DataTableItemsPerPage from '@/components/data-table/data-table-item-per-page';
import NoData from '@/components/no-data';
import PaginationInfo from '@/components/pagination-info';
import Uploader from '@/components/uploader';

import DirectoryTree from '@/modules/categories/components/directory-tree';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';
import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';
import { useCategoriesState } from '@/modules/categories/states/categories.state';

import FileApi from '../api/files.api';
import { useFilesState } from '../states/files.state';
import { uploadValidator } from '../validators/upload.validator';

import Filter from './file-filter';
import FileList from './file-list';

type FilesRootTypes = {
  categoryVisible?: boolean;
  selected?: FileEntity[];
} & ComponentBaseProps;

const FilesRoot: FC<FilesRootTypes> = ({ className, categoryVisible = true }) => {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filesState = useFilesState();
  const categoriesState = useCategoriesState();
  const [isUploading, setIsUploading] = useState(false);

  const { items, meta, filter, filteredAt } = filesState;
  const categoryId: string | null = searchParams.get('categoryId');

  const getFilter = (): FileFilter => {
    return {
      categoryId: categoryId || DEFAULT_FILTER.categoryId,
      q: searchParams.get('q') || DEFAULT_FILTER.q,
      page: parseInt(searchParams.get('page') as string) || DEFAULT_FILTER.page,
      limit: parseInt(searchParams.get('limit') as string) || DEFAULT_FILTER.limit,
      order: searchParams.get('order') || DEFAULT_FILTER.order,
      status: searchParams.getAll('status') || DEFAULT_FILTER.status,
      mime: searchParams.get('mime') || DEFAULT_FILTER.mime
    };
  };

  const onUpload = (files: FileList) => {
    const validateResult = uploadValidator.safeParse({ categoryId, files });

    if (!validateResult.success) {
      const errors = validateResult.error.errors.map(err => err.message);

      toast({ title: 'Upload', description: errors.join('<br>') });
    } else {
      setIsUploading(true);

      FileApi.upload({ categoryId, files }).then(() => {
        filesState.listRequest({ filter });

        setIsUploading(false);
      });
    }
  };

  useEffect(() => {
    if (categoryVisible) categoriesState.listRequest({ filter: { type: CATEGORY_TYPE.FILE } });
  }, [categoryVisible]);

  useEffect(() => {
    const currentFilter = getFilter();

    if (filter) {
      const customFilter = {
        ...filter,
        sidebar: searchParams.get('sidebar')
      } as FileFilter & { sidebar: string };

      router.push({ pathname: '/files', query: customFilter });
      filesState.listRequest({ filter });
    } else {
      filesState.setFilter(currentFilter);
    }
  }, [filteredAt]);

  return (
    <div className={classNames('flex grow flex-col', className)}>
      <div className="flex items-center justify-between">
        <Filter
          onSearch={text => filesState.setFilter({ q: text })}
          onResetFilter={() =>
            filesState.setFilter({
              ...DEFAULT_FILTER,
              categoryId: filter?.categoryId
            })
          }
        />
        <Uploader
          trigger={t('add_new_assets')}
          multiple={true}
          loading={isUploading}
          maxFileSize={MAX_FILE_SIZE_IN_BYTES}
          maxFiles={MAX_FILES_TO_UPLOAD}
          accept={VALID_ALL_MIME_TYPES.join(',')}
          onChange={onUpload}
        />
      </div>
      <div className="mt-3 flex grow flex-col">
        <ResizablePanelGroup direction="horizontal">
          {categoryVisible && (
            <>
              <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
                <div className="h-full flex-col p-4">
                  <DirectoryTree
                    data={[{ name: 'All', id: '' } as CategoryEntity, ...categoriesState.items]}
                    onItemClick={node => filesState.setFilter({ categoryId: node.id, page: 1 })}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}
          <ResizablePanel defaultSize={80} minSize={10}>
            <div className="flex h-full flex-col rounded-lg border bg-card p-4">
              {filesState.isFetching ? (
                <div className="flex grow items-center justify-center">
                  <Loading className="mx-auto" />
                </div>
              ) : (
                <>
                  {!filesState.error && filesState.items.length > 0 ? (
                    <FileList
                      className="grid grid-cols-3 gap-4 md:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10"
                      data={items}
                      type={'list'}
                      selectedItems={[]}
                    />
                  ) : (
                    <NoData />
                  )}
                </>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex items-center space-x-2">
          <DataTableItemsPerPage
            limit={filter?.limit}
            onFilter={value => filesState.setFilter({ page: 1, limit: +value })}
          />
          <PaginationInfo amount={meta?.paging?.totalItems} text={t('file_records')} />
        </div>
        <Pagination
          totalItems={meta?.paging?.totalItems || 0}
          currentPage={meta?.paging?.currentPage}
          itemPerPage={meta?.paging?.itemsPerPage}
          onChange={page => filesState.setFilter({ page })}
        />
      </div>
    </div>
  );
};

export default FilesRoot;
