import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  AuthenticatedParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'Settings'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function SettingScreen({}: Props) {
  const screenState = useScreenState();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <ScrollView style={[ds.flex1, ds.p14]} />
    </View>
  );
}

export default SettingScreen;
