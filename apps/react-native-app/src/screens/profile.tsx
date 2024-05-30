import React from 'react';
import { GlobeLock, LifeBuoy, LogOut, Settings, User } from 'lucide-react-native';
import { View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import Divider from '@/components/core-ui/divider';
import StatusBar from '@/components/core-ui/statusbar';

import { useAuthState } from '@/modules/auth/states/auth.state';
import Profile from '@/modules/profile/conponents/profile';
import ProfileActionList from '@/modules/profile/conponents/profile-action-list';
import ProfileVersion from '@/modules/profile/conponents/profile-version';
import { ProfileAction } from '@/modules/profile/interfaces/profile.interface';
import { useScreenState } from '@/modules/screen/states/screen.state';
import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Profile'>,
  StackScreenProps<AuthenticatedParamList>
>;

function ProfileScreen({}: Props) {
  const screenState = useScreenState();
  const authState = useAuthState();
  const { themeConfigs } = useTheme();

  const profileActions: ProfileAction[] = [
    { icon: User, name: 'Your Profile', type: 'sub', action: () => {} },
    { icon: LifeBuoy, name: 'Help Center', type: 'sub', action: () => {} },
    { icon: GlobeLock, name: 'Privacy Policy', type: 'sub', action: () => {} },
    { icon: Settings, name: 'Settings', type: 'sub', action: () => {} },
    { icon: LogOut, name: 'Log Out', type: 'inline', action: () => authState.logoutRequest() }
  ];

  return (
    <View style={[ds.flex1]}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <ScrollView style={[ds.px14, ds.py14]} showsVerticalScrollIndicator={false}>
        <View style={[ds.rounded16, ds.overflowHidden, styles.background(themeConfigs.card)]}>
          <Divider />
          <Profile />
          <ProfileActionList items={profileActions} style={ds.mt14} />
        </View>
        <ProfileVersion style={ds.mt10} />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return {
      backgroundColor: color
    };
  }
});
