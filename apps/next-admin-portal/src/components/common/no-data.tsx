import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type NoDataProps = {
  text?: string;
} & ComponentBaseProps;

const NoData: FC<NoDataProps> = ({ className, text }) => {
  const t = useTranslations();

  return (
    <div className={classNames('flex grow items-center justify-center', className)}>
      <p>{text ?? t('no_data')}</p>
    </div>
  );
};

export default NoData;
