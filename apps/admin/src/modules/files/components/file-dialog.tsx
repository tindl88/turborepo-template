import React, { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@ui/components/ui/dialog';
import { Loading } from '@ui/components/ui/loading';
import Pagination from '@ui/components/ui/pagination-custom';
import { useToast } from '@ui/components/ui/use-toast';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity, FileFilter } from '../interfaces/files.interface';

import {
  DEFAULT_FILTER,
  MAX_FILE_SIZE_IN_BYTES,
  MAX_FILES_TO_UPLOAD,
  VALID_ALL_MIME_TYPES
} from '../constants/files.constant';

import useDeepCompareEffect from '@/hooks/use-deep-compare-effect';
import { useFileDialogState } from '../hooks/use-file-dialog-state';

import DataTableItemsPerPage from '@/components/common/data-table/data-table-item-per-page';
import NoData from '@/components/common/no-data';
import Uploader from '@/components/common/uploader';

import FileApi from '../api/files.api';
import { useFilesState } from '../states/files.state';
import { uploadValidator } from '../validators/upload.validator';

import Filter from './file-filter';
import FileList from './file-list';

type FileDialogProps = {
  type: 'single' | 'multiple';
  mime?: string;
  visible: boolean;
  selectedItems: FileEntity[];
  onCancel?: () => void;
  onSelectClick?: (items: FileEntity[]) => void;
} & ComponentBaseProps;

const FileDialog: FC<FileDialogProps> = ({ type = 'single', mime, visible, onCancel, onSelectClick }) => {
  const { toast } = useToast();
  const t = useTranslations();
  const filesState = useFilesState();
  const [filter, setFilter] = useState<FileFilter>({ ...DEFAULT_FILTER, mime });
  const [isUploading, setIsUploading] = useState(false);
  const fileDialogState = useFileDialogState();

  const { items, meta } = filesState;
  const categoryId = null;

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
    fileDialogState.clear();
  }, [visible]);

  useEffect(() => {
    fileDialogState.setType(type);
  }, [type]);

  useDeepCompareEffect(() => {
    if (!visible) return;

    if (filter) {
      filesState.listRequest({ filter });
    } else {
      setFilter(DEFAULT_FILTER);
    }
  }, [filter, visible]);

  return (
    <Dialog open={visible} modal={true} onOpenChange={() => onCancel?.()}>
      <DialogContent className="bg-card top-0 max-w-5xl translate-y-0 p-0">
        <DialogHeader className="p-4">
          <DialogTitle>{t('assets')}</DialogTitle>
        </DialogHeader>
        <div className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <Filter
              onSearch={text => setFilter({ ...filter, q: text })}
              onResetFilter={() => setFilter({ ...filter, categoryId: filter?.categoryId })}
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
          {filesState.isFetching ? (
            <div className="flex min-h-32 grow items-center justify-center">
              <Loading className="mx-auto" />
            </div>
          ) : (
            <>
              {!filesState.error && filesState.items.length > 0 ? (
                <FileList
                  type={fileDialogState.type}
                  className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5 xl:grid-cols-7"
                  data={items}
                  selectedItems={fileDialogState.selectedItems}
                  onItemClick={file => fileDialogState.setSelectedItem(type, file)}
                />
              ) : (
                <NoData className="min-h-32" />
              )}
            </>
          )}
        </div>
        <DialogFooter className="bg-background rounded-b-lg p-4">
          <div className="flex w-full items-center justify-between">
            <Button variant={'outline'} onClick={() => onCancel?.()}>
              {t('close')}
            </Button>
            <div className="flex items-center justify-center space-x-4">
              <DataTableItemsPerPage
                limit={filter?.limit}
                onFilter={value => setFilter({ ...filter, page: 1, limit: +value })}
              />
              <Pagination
                totalItems={meta?.paging?.totalItems || 0}
                currentPage={meta?.paging?.currentPage}
                itemPerPage={meta?.paging?.itemsPerPage}
                onChange={page => setFilter({ ...filter, page })}
              />
            </div>
            <Button
              disabled={fileDialogState.selectedItems.length === 0}
              onClick={() => onSelectClick?.(fileDialogState.selectedItems)}
            >
              {t('file_choose_selected')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileDialog;
