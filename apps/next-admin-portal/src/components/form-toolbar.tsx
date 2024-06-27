import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '~ui/components/ui/button';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type FormToolbarProps = {
  title?: string;
  submitDisabled?: boolean;
  onBackClick: () => void;
} & ComponentBaseProps;

const FormToolbar: FC<FormToolbarProps> = ({ className, title, submitDisabled = true, onBackClick }) => {
  const t = useTranslations();

  return (
    <div className={classNames('flex items-center justify-between', className)}>
      <div className="flex items-center space-x-4">
        <Button type="button" className="px-2.5" onClick={onBackClick}>
          <ChevronLeftIcon size={18} />
        </Button>
        {title && <h3 className="text-xl font-bold">{title}</h3>}
      </div>
      <Button disabled={submitDisabled} type="submit">
        {t('save')}
      </Button>
    </div>
  );
};

export default FormToolbar;
