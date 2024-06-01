import React, { FC } from 'react';
import { ds } from '@/design-system';

import { languageItems } from '../constants/language.constant';

import Box from '@/components/common/box';

import { useLanguageState } from '../states/language.state';

import LanguageList from './language-list';

type LanguageProps = {};

const Language: FC<LanguageProps> = () => {
  const { language } = useLanguageState();

  return (
    <Box padding={0} style={ds.grow}>
      <LanguageList items={languageItems} currentLanguage={language.key} />
    </Box>
  );
};

export default Language;
