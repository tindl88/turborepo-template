import React from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';

type Props = StackScreenProps<AuthenticatedParamList, 'HelpCenter'>;

function HelpCenterScreen({ route }: Props) {
  return (
    <View style={[ds.flex1]}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
    </View>
  );
}

export default HelpCenterScreen;
