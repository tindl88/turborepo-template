import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, ColorSchemeName } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ds } from '@/design-system';
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import Navigator from '@/navigation';

import GlobalModal from '@/components/common/modal/global-modal';
import LoadingBox from '@/components/common/popup/loading-box';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';
import SafeViewArea from '@/modules/screen/components/safe-view-area';
import * as Constants from '@/modules/screen/constants/screen.constant';
import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

import { accessibility } from '@/utils/accessibility.util';

const NavContainer = () => {
  const navigationRef = useNavigationContainerRef();
  const { i18n } = useTranslation();
  const screenState = useScreenState();
  const authState = useAuthState();
  const { theme, configs } = useThemeState();
  const { language } = useLanguageState();

  const customTheme = Object.assign({}, DefaultTheme, {
    colors: {
      background: configs.background
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language.key);
  }, [language.key]);

  useEffect(() => {
    Appearance.setColorScheme(theme.key as ColorSchemeName);
  }, [theme.key]);

  return (
    <SafeAreaProvider style={ds.flex1}>
      <NavigationContainer
        ref={navigationRef}
        theme={customTheme}
        onReady={() => {
          BootSplash.hide({ fade: true, duration: 300 });
        }}
        onStateChange={async () => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const currentRouteName = navigationRef.getCurrentRoute()?.name!;

          // eslint-disable-next-line no-console
          console.log('\x1b[36m%s\x1b[0m', '\nCURRENT SCREEN: \n' + currentRouteName + '\n\n');

          screenState.setScreen({
            name: currentRouteName,
            spacingTop: Constants.Screen[currentRouteName]?.spacing?.top,
            spacingRight: Constants.Screen[currentRouteName]?.spacing?.right,
            spacingBottom: Constants.Screen[currentRouteName]?.spacing?.bottom,
            spacingLeft: Constants.Screen[currentRouteName]?.spacing?.left
          });
        }}
      >
        <SafeViewArea {...accessibility('Screen View')} backgroundColor={configs.background}>
          <Navigator />
          <GlobalModal />
          <LoadingBox visible={authState.isFetching} />
        </SafeViewArea>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavContainer;