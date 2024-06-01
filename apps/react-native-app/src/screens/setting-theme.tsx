import React from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList, HomeDrawerParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';

import Theme from '@/modules/theme/components/theme';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'SettingTheme'>,
  CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function SettingThemeScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <Theme />
    </View>
  );
}

export default SettingThemeScreen;
