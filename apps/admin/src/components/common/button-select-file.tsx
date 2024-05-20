import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UploadIcon } from 'lucide-react';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type ButtonSelectFileProps = {
  onClick?: () => void;
} & ComponentBaseProps;

const ButtonSelectFile: FC<ButtonSelectFileProps> = ({ className, onClick }) => {
  const t = useTranslations();

  return (
    <button
      type="button"
      className={classNames('flex items-center justify-center rounded-md border border-dashed p-1.5', className)}
      onClick={onClick}
    >
      <UploadIcon className="text-muted-foreground h-4 w-4" />
      <span className="sr-only">{t('select_files')}</span>
    </button>
  );
};

export default ButtonSelectFile;
