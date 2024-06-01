import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList, HomeDrawerParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import Divider from '@/components/core-ui/divider';
import StatusBar from '@/components/core-ui/statusbar';

import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'Setting'>,
  CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function SettingScreen({}: Props) {
  const screenState = useScreenState();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <Divider />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default SettingScreen;
