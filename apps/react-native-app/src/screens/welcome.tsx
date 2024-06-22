import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import GetStarted from '@/modules/welcome/components/get-started';
import WelcomeSlider from '@/modules/welcome/components/welcome-slider';

type Props = StackScreenProps<UnauthenticatedParamList, 'Welcome'>;

function WelcomeScreen({}: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar visible={false} />
      <WelcomeSlider />
      <GetStarted />
    </View>
  );
}

export default WelcomeScreen;
