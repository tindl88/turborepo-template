import React from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, DrawerParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'TermsAndConditions'>,
  CompositeScreenProps<DrawerScreenProps<DrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function TermsAndConditionsScreen({ route }: Props) {
  return (
    <View style={[ds.flex1]}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
    </View>
  );
}

export default TermsAndConditionsScreen;
