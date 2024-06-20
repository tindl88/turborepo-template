import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import {
  AuthenticatedParamList,
  ProfileParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import ProfileRoot from '@/modules/profile/conponents/profile-root';

type Props = CompositeScreenProps<
  StackScreenProps<ProfileParamList, 'Profile'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, StackScreenProps<AuthenticatedParamList>>
>;

function ProfileScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <ScrollView showsVerticalScrollIndicator={false} style={ds.p14}>
        <ProfileRoot />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
