import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity } from '../interfaces/files.interface';

import { FileDialogType } from '../constants/files.constant';

import FileItem from './file-item';

type FileListProps = {
  type: FileDialogType;
  data?: FileEntity[];
  selectedItems: FileEntity[];
  onItemClick?: (item: FileEntity) => void;
} & ComponentBaseProps;

const FileList: FC<FileListProps> = ({ className, data, selectedItems, type, onItemClick }) => {
  return (
    <div className={classNames(className)}>
      {data?.map(file => {
        const isChecked = !!selectedItems?.find(x => x.id === file.id);

        return <FileItem key={file.id} file={file} checked={isChecked} type={type} onClick={onItemClick} />;
      })}
    </div>
  );
};

export default FileList;
