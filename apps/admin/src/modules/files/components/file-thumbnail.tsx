import React, { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { FileEntity } from '../interfaces/files.interface';

type FileThumbnailProps = {
  file: FileEntity;
} & ComponentBaseProps;

const FileThumbnail: FC<FileThumbnailProps> = ({ className, file }) => {
  return (
    <Image
      fill
      className={classNames('relative aspect-video object-cover object-center', className)}
      src={process.env.NEXT_PUBLIC_API_URL + '/thumbnails/' + file.uniqueName}
      alt={file.name || ''}
      priority={false}
    />
  );
};

export default FileThumbnail;
