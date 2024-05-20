import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { XIcon } from 'lucide-react';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type ButtonRemoveFileProps = {
  onClick?: () => void;
} & ComponentBaseProps;

const ButtonRemoveFile: FC<ButtonRemoveFileProps> = ({ className, onClick }) => {
  const t = useTranslations();

  return (
    <button
      type="button"
      className={classNames('bg-primary/60 absolute right-1 top-1 rounded text-white', className)}
      onClick={onClick}
    >
      <XIcon size={16} />
      <span className="sr-only">{t('remove_file')}</span>
    </button>
  );
};

export default ButtonRemoveFile;
