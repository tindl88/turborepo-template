import React from 'react';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import HelpCenter from '@/modules/help-center/components/help-center';

type Props = StackScreenProps<AuthenticatedParamList, 'HelpCenter'>;

function HelpCenterScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <HelpCenter />
    </View>
  );
}

export default HelpCenterScreen;
