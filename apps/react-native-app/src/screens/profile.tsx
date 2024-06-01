import React from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';

import Profile from '@/modules/profile/conponents/profile';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Profile'>,
  StackScreenProps<AuthenticatedParamList>
>;

function ProfileScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <Profile />
    </View>
  );
}

export default ProfileScreen;
