import React, { FC } from 'react';
import { ds } from '@/design-system';

import { themeItems } from '../constants/theme.constant';

import Box from '@/components/common/box';

import { useThemeState } from '../states/theme.state';

import ThemeList from './theme-list';

type ThemeProps = {};

const Theme: FC<ThemeProps> = () => {
  const { theme } = useThemeState();

  return (
    <Box padding={0} style={ds.grow}>
      <ThemeList items={themeItems} currentTheme={theme.key} />
    </Box>
  );
};

export default Theme;
