import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { ds } from '~react-native-design-system';

import GlobalModal from '@/components/global-modal/global-modal';

import { useThemeState } from '@/modules/theme/states/theme.state';

import NavigationRoot from './navigation-root';

const linking = {
  prefixes: ['com.tin.bully://'],
  config: {
    screens: {
      Login: {
        path: 'login'
      }
    }
  }
};

const NavContainer = () => {
  const navigationRef = useNavigationContainerRef();
  const { configs } = useThemeState();

  const customTheme = Object.assign({}, DefaultTheme, {
    colors: {
      background: configs.background
    }
  });

  return (
    <SafeAreaProvider style={ds.flex1}>
      <GestureHandlerRootView style={ds.flex1}>
        <NavigationContainer
          ref={navigationRef}
          theme={customTheme}
          linking={linking}
          onReady={() => {
            BootSplash.hide({ fade: true });
          }}
          onStateChange={async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const currentRouteName = navigationRef.getCurrentRoute()?.name!;

            // eslint-disable-next-line no-console
            console.log('\x1b[36m%s\x1b[0m', '\nCURRENT SCREEN: \n' + currentRouteName + '\n\n');
          }}
        >
          <NavigationRoot />
          <GlobalModal />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default NavContainer;
