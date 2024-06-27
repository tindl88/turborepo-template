import React, { FC } from 'react';
import classNames from 'classnames';
import { Checkbox } from '~react-web-ui-shadcn/components/ui/checkbox';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity } from '../interfaces/files.interface';

import { FileDialogType } from '../constants/files.constant';

import { convertBytes } from '~shared-universal/utils/string.util';

import FileIcon from './file-icon';
import FileThumbnail from './file-thumbnail';

type FileItemProps = {
  type: FileDialogType;
  file: FileEntity;
  checked: boolean;
  onClick?: (file: FileEntity) => void;
} & ComponentBaseProps;

const FileItem: FC<FileItemProps> = ({ className, type, file, checked, onClick }) => {
  const getFileContent = (item: FileEntity) => {
    switch (item.ext) {
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
        return <FileThumbnail file={item} />;
      default:
        return <FileIcon file={item} />;
    }
  };

  return (
    <div className={classNames(type !== 'list' && 'cursor-pointer', className)} onClick={() => onClick?.(file)}>
      <div
        key={file.id}
        className={classNames(
          'relative overflow-hidden rounded-lg bg-background',
          checked && 'border-primary',
          type === 'list' ? 'border' : 'border-2'
        )}
      >
        {type !== 'list' && <Checkbox className="absolute right-1 top-1 z-10" checked={checked} id={file.id} />}
        <div
          className="pointer-events-none relative flex h-20 items-center justify-center bg-card"
          onClick={() => onClick?.(file)}
        >
          {getFileContent(file)}
        </div>
        <div className="bottom-0 left-0 w-full bg-black/10 p-1">
          <p className="mb-1 truncate text-xs" title={file.uniqueName}>
            {file.uniqueName}
          </p>
          <p className="text-xs text-gray-500">{convertBytes(file.size)}</p>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
