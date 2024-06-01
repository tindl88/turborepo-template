import React from 'react';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList, HomeDrawerParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import PrivacyPolicy from '@/modules/privacy-policy/components/privacy-policy';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'PrivacyPolicy'>,
  CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function PrivacyPolicyScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <PrivacyPolicy />
    </View>
  );
}

export default PrivacyPolicyScreen;
