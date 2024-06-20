import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Box from '@/components/box';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import {
  ProfileParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import ProfileEditRoot from '@/modules/profile/conponents/profile-edit-root';

type Props = CompositeScreenProps<
  StackScreenProps<ProfileParamList, 'ProfileEdit'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function ProfileEditScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <ProfileEditRoot />
        </Box>
      </Box>
    </View>
  );
}

export default ProfileEditScreen;
