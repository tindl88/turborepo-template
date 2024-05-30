import React, { FC } from 'react';
import { GlobeLockIcon, LifeBuoyIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react-native';
import { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces/navigation.interface';
import { ProfileAction } from '../interfaces/profile.interface';

import Divider from '@/components/core-ui/divider';
import View from '@/components/core-ui/view';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

import ProfileActionList from './profile-action-list';
import ProfileAvatar from './profile-avatar';
import ProfileVersion from './profile-version';

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeBottomTabParamList>,
  DrawerNavigationProp<AuthenticatedParamList>
>;
type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  const authState = useAuthState();
  const { themeConfigs } = useTheme();

  const profileActions: ProfileAction[] = [
    { icon: UserIcon, name: 'Your Profile', type: 'sub', action: () => navigation.navigate('ProfileEdit') },
    { icon: LifeBuoyIcon, name: 'Help Center', type: 'sub', action: () => navigation.navigate('HelpCenter') },
    {
      icon: GlobeLockIcon,
      name: 'Terms & Conditions',
      type: 'sub',
      action: () => navigation.navigate('TermsAndConditions')
    },
    { icon: GlobeLockIcon, name: 'Privacy Policy', type: 'sub', action: () => navigation.navigate('PrivacyPolicy') },
    { icon: SettingsIcon, name: 'Settings', type: 'sub', action: () => navigation.navigate('Setting') },
    { icon: SettingsIcon, name: 'Languages', type: 'sub', action: () => navigation.navigate('SettingLanguage') },
    { icon: SettingsIcon, name: 'Themes', type: 'sub', action: () => navigation.navigate('SettingTheme') },
    { icon: LogOutIcon, name: 'Log Out', type: 'inline', action: () => authState.logoutRequest() }
  ];

  return (
    <>
      <ScrollView style={[ds.px14, ds.py14]} showsVerticalScrollIndicator={false}>
        <View style={[ds.rounded16, ds.overflowHidden, styles.background(themeConfigs.card)]}>
          <Divider />
          <ProfileAvatar />
          <ProfileActionList items={profileActions} style={ds.mt14} />
        </View>
        <ProfileVersion style={ds.mt10} />
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return {
      backgroundColor: color
    };
  }
});
