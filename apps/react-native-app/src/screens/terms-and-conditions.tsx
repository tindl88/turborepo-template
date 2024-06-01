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

import TermsAndConditions from '@/modules/terms-and-conditions/components/terms-and-conditions';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'TermsAndConditions'>,
  CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function TermsAndConditionsScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <TermsAndConditions />
    </View>
  );
}

export default TermsAndConditionsScreen;
