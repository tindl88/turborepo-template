import React, { FC } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import { ThemeEntity } from '../interfaces/theme.interface';

import { useThemeState } from '../states/theme.state';

import ThemeItem from './theme-item';

type ThemeListProps = {
  currentTheme: string;
  items: ThemeEntity[];
};

const ThemeList: FC<ThemeListProps> = ({ items, currentTheme }) => {
  const themeState = useThemeState();

  const handleSelectTheme = (theme: ThemeEntity) => {
    themeState.setTheme(theme);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <ThemeItem item={item} selectedTheme={currentTheme} onSelectTheme={handleSelectTheme} />
      )}
      contentContainerStyle={[ds.p10, ds.grow, ds.column, ds.gap4]}
    />
  );
};

export default ThemeList;
