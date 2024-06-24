import React from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { AuthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import ThemeRoot from '@/modules/theme/components/theme-root';

import { getHeaderTitle } from '@/utils/header-title.util';

function SettingThemeScreen({ route }: AuthenticatedStackProps<'SettingTheme'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <ThemeRoot />
    </View>
  );
}

export default SettingThemeScreen;
