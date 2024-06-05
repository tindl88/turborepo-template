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

import ProfileEdit from '@/modules/profile/conponents/profile-edit';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'ProfileEdit'>,
  CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList>, BottomTabScreenProps<HomeBottomTabParamList>>
>;

function ProfileEditScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <ProfileEdit />
    </View>
  );
}

export default ProfileEditScreen;
