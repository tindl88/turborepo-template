import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import Language from '@/modules/language/components/language';
import {
  AuthenticatedParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'SettingLanguage'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function SettingLanguageScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <Language />
    </View>
  );
}

export default SettingLanguageScreen;
