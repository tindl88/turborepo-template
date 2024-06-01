import React, { FC } from 'react';
import {
  GlobeLockIcon,
  LanguagesIcon,
  LifeBuoyIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
  ShieldAlertIcon,
  UserIcon
} from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces/navigation.interface';
import { ProfileAction } from '../interfaces/profile.interface';

import Box from '@/components/common/box';
import Divider from '@/components/core-ui/divider';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

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
  const { language } = useLanguageState();
  const { theme } = useThemeState();

  const profileActions: ProfileAction[] = [
    { icon: UserIcon, name: 'Your Profile', type: 'sub', action: () => navigation.navigate('ProfileEdit') },
    { icon: LifeBuoyIcon, name: 'Help Center', type: 'sub', action: () => navigation.navigate('HelpCenter') },
    {
      icon: GlobeLockIcon,
      name: 'Terms & Conditions',
      type: 'sub',
      action: () => navigation.navigate('TermsAndConditions')
    },
    { icon: ShieldAlertIcon, name: 'Privacy Policy', type: 'sub', action: () => navigation.navigate('PrivacyPolicy') },
    { icon: SettingsIcon, name: 'Settings', type: 'sub', action: () => navigation.navigate('Setting') },
    {
      icon: LanguagesIcon,
      name: 'Languages',
      type: 'sub',
      value: language.value,
      action: () => navigation.navigate('SettingLanguage')
    },
    {
      icon: PaletteIcon,
      name: 'Themes',
      type: 'sub',
      value: theme.value,
      action: () => navigation.navigate('SettingTheme')
    },
    { icon: LogOutIcon, name: 'Log Out', type: 'inline', action: () => authState.logoutRequest() }
  ];

  return (
    <>
      <ScrollView style={[ds.px14, ds.py14]} showsVerticalScrollIndicator={false}>
        <Box padding={0} style={[ds.rounded16, ds.overflowHidden]}>
          <Divider height={14} />
          <ProfileAvatar />
          <ProfileActionList items={profileActions} style={ds.mt14} />
        </Box>
        <ProfileVersion style={ds.mt10} />
      </ScrollView>
    </>
  );
};

export default Profile;
