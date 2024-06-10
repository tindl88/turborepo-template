import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ds } from '@/design-system';
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import GlobalModal from '@/components/common/modal/global-modal';
import LoadingBox from '@/components/common/popup/loading-box';

import { useAuthState } from '@/modules/auth/states/auth.state';
import SafeViewArea from '@/modules/screen/components/safe-view-area';
import * as Constants from '@/modules/screen/constants/screen.constant';
import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

import { accessibility } from '@/utils/accessibility.util';

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
  const screenState = useScreenState();
  const authState = useAuthState();
  const { configs } = useThemeState();

  const customTheme = Object.assign({}, DefaultTheme, {
    colors: {
      background: configs.background
    }
  });

  return (
    <SafeAreaProvider style={ds.flex1}>
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
          <NavigationRoot />
          <GlobalModal />
          <LoadingBox visible={authState.isFetching} />
        </SafeViewArea>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavContainer;
