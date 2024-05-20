import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity } from '../interfaces/files.interface';

type FileIconProps = {
  file: FileEntity;
} & ComponentBaseProps;

const FileIcon: FC<FileIconProps> = ({ className, file }) => {
  return (
    <div className={classNames('relative h-12 w-10 rounded-md border-2 border-amber-600', className)}>
      <p className="bg-primary absolute bottom-2 left-1/2 -ml-6 w-12 rounded px-1 text-center text-sm font-bold uppercase text-white">
        {file.ext.replace('.', '')}
      </p>
    </div>
  );
};

export default FileIcon;
