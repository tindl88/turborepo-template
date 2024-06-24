import React from 'react';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { UnauthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import GetStarted from '@/modules/welcome/components/get-started';
import WelcomeSlider from '@/modules/welcome/components/welcome-slider';

function WelcomeScreen({}: UnauthenticatedStackProps<'Welcome'>) {
  return (
    <View style={ds.flex1}>
      <StatusBar visible={false} />
      <WelcomeSlider />
      <GetStarted />
    </View>
  );
}

export default WelcomeScreen;
