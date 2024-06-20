import React, { FC } from 'react';
import { t } from 'i18next';
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
import { LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { ds } from '~react-native-design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import Box from '@/components/box';
import Divider from '@/components/core-ui/divider';

import AuthApi from '@/modules/auth/api/auth.api';
import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';
import {
  AuthenticatedParamList,
  ProfileParamList,
  TravelBottomTabParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

import log from '@/utils/logger.util';

import ProfileActionList from './profile-action-list';
import ProfileAvatar from './profile-avatar';
import ProfileVersion from './profile-version';

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<ProfileParamList>,
  CompositeNavigationProp<StackNavigationProp<TravelBottomTabParamList>, DrawerNavigationProp<AuthenticatedParamList>>
>;
type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  const authState = useAuthState();
  const { language } = useLanguageState();
  const { theme } = useThemeState();

  const mutation = useMutation({
    mutationFn: () => AuthApi.signOut(),
    onSuccess: () => log.extend('AUTH').info('Logout successs'),
    onError: error => log.extend('AUTH').error(`Logout failed: ${error}`)
  });

  const profileActions: ProfileAction[] = [
    {
      icon: UserIcon,
      name: t('edit_your_profile'),
      type: 'sub',
      action: () => navigation.navigate('ProfileEdit')
    },
    {
      icon: LifeBuoyIcon,
      name: t('help_center'),
      type: 'sub',
      action: () => navigation.navigate('HelpCenter')
    },
    {
      icon: GlobeLockIcon,
      name: t('terms_and_conditions'),
      type: 'sub',
      action: () => navigation.navigate('TermsAndConditions')
    },
    {
      icon: ShieldAlertIcon,
      name: t('privacy_policy'),
      type: 'sub',
      action: () => navigation.navigate('PrivacyPolicy')
    },
    {
      icon: SettingsIcon,
      name: t('settings'),
      type: 'sub',
      action: () => navigation.navigate('Settings')
    },
    {
      icon: LanguagesIcon,
      name: t('languages'),
      type: 'sub',
      value: language.value,
      action: () => navigation.navigate('SettingLanguage')
    },
    {
      icon: PaletteIcon,
      name: t('themes'),
      type: 'sub',
      value: theme.value,
      action: () => navigation.navigate('SettingTheme')
    },
    {
      icon: LogOutIcon,
      name: t('logout'),
      type: 'inline',
      action: () => {
        authState.reset();
        GoogleSignin.signOut();
        LoginManager.logOut();
        mutation.mutate();
      }
    }
  ];

  return (
    <>
      <Box padding={0} style={[ds.rounded16, ds.overflowHidden]}>
        <Divider height={14} />
        <ProfileAvatar />
        <ProfileActionList items={profileActions} style={ds.mt14} />
      </Box>
      <ProfileVersion style={ds.mt10} />
    </>
  );
};

export default Profile;
