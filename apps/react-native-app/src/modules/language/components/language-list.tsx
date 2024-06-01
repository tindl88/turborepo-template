import React, { FC } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import { LanguageEntity } from '../interfaces/language.interface';

import { useLanguageState } from '../states/language.state';

import LanguageItem from './language-item';

type LanguageListProps = {
  currentLanguage: string;
  items: LanguageEntity[];
};

const LanguageList: FC<LanguageListProps> = ({ items, currentLanguage }) => {
  const language = useLanguageState();

  const handleSelectLanguage = (lang: LanguageEntity) => {
    language.setLanguage(lang);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <LanguageItem item={item} selectedLanguage={currentLanguage} onSelectLanguage={handleSelectLanguage} />
      )}
      contentContainerStyle={[ds.p10, ds.grow, ds.column, ds.gap4]}
    />
  );
};

export default LanguageList;
