import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, useColorScheme } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import Navigator from '@/navigation';

import GlobalModal from '@/components/common/modal/global-modal';
import LoadingBox from '@/components/common/popup/loading-box';
import { Colors, DesignSystem as ds } from '@/components/core-ui/themes';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';
import SafeViewArea from '@/modules/screen/components/safe-view-area';
import * as Constants from '@/modules/screen/constants/screen.constant';
import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/themes/states/themes.state';

import { accessibility } from '@/utils/accessibility.util';

const customDarkTheme = Object.assign({}, DarkTheme, {
  colors: {
    background: Colors.gray[800]
  }
});

const customLightTheme = Object.assign({}, DefaultTheme, {
  colors: {
    background: Colors.gray[50]
  }
});

const NavContainer = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const screenState = useScreenState();
  const authState = useAuthState();
  const themeState = useThemeState();
  const languageState = useLanguageState();

  useEffect(() => {
    Appearance.setColorScheme(themeState.colorScheme);
  }, [themeState.colorScheme]);

  useEffect(() => {
    i18n.changeLanguage(languageState.language);
  }, [languageState.language]);

  return (
    <SafeAreaProvider style={ds.flex1}>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === 'dark' ? customDarkTheme : customLightTheme}
        onReady={() => {
          BootSplash.hide({ fade: true, duration: 300 });
          routeNameRef.current = navigationRef.getCurrentRoute()?.name!;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()?.name!;

          if (previousRouteName !== currentRouteName) {
            routeNameRef.current = currentRouteName;
          }

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
        <SafeViewArea {...accessibility('Screen View')}>
          <Navigator />
          <GlobalModal />
          <LoadingBox visible={authState.isFetching} />
        </SafeViewArea>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavContainer;
