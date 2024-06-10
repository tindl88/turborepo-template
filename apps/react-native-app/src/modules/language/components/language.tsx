import React, { FC } from 'react';

import { languageItems } from '../constants/language.constant';

import { useLanguageState } from '../states/language.state';

import LanguageList from './language-list';

type LanguageProps = {};

const Language: FC<LanguageProps> = () => {
  const { language } = useLanguageState();

  return <LanguageList items={languageItems} currentLanguage={language.key} />;
};

export default Language;
