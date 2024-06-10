import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  AuthenticatedParamList,
  ProfileParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import Profile from '@/modules/profile/conponents/profile';

type Props = CompositeScreenProps<
  StackScreenProps<ProfileParamList, 'Profile'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, StackScreenProps<AuthenticatedParamList>>
>;

function ProfileScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <ScrollView showsVerticalScrollIndicator={false} style={ds.p14}>
        <Profile />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
