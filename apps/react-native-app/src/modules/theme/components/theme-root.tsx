import React, { FC } from 'react';

import { themeItems } from '../constants/theme.constant';

import { useThemeState } from '../states/theme.state';

import ThemeList from './theme-list';

type ThemeRootProps = {};

const ThemeRoot: FC<ThemeRootProps> = () => {
  const { theme } = useThemeState();

  return <ThemeList items={themeItems} currentTheme={theme.key} />;
};

export default ThemeRoot;
