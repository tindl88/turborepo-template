import React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations } from 'next-intl';

const HeaderTitle = () => {
  const segment = useSelectedLayoutSegment();
  const t = useTranslations();

  return <h1 className="text-xl font-bold">{t(`page_${segment?.replaceAll('-', '_')}`)}</h1>;
};

export default HeaderTitle;
