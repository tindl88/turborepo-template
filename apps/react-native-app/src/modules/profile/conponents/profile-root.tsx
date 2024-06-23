import React from 'react';
import { t } from 'i18next';
import { Pressable } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { Colors, ds } from '~react-native-design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import Box from '@/components/box';
import Divider from '@/components/core-ui/divider';
import Text from '@/components/core-ui/text';
import { hideGlobalModal, showGlobalModal } from '@/components/global-modal/global-modal';
import Icon from '@/components/icon';
import ModalConfirm from '@/components/modal-confirm';

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

const Profile = () => {
  const navigation = useNavigation<NavigationProps>();
  const authState = useAuthState();
  const { language } = useLanguageState();
  const { theme, configs } = useThemeState();
  const mutation = useMutation({
    mutationFn: () => AuthApi.signOut(),
    onSuccess: () => log.extend('AUTH').info('Logout success'),
    onError: error => log.extend('AUTH').error(`Logout failed: ${error}`)
  });

  const profileActions: ProfileAction[] = [
    {
      icon: <Icon size={28} color={configs.primary[500]} name="User" />,
      name: t('edit_your_profile'),
      type: 'sub',
      action: () => navigation.navigate('ProfileEdit')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="LifeBuoy" />,
      name: t('help_center'),
      type: 'sub',
      action: () => navigation.navigate('HelpCenter')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="GlobeLock" />,
      name: t('terms_and_conditions'),
      type: 'sub',
      action: () => navigation.navigate('TermsAndConditions')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="ShieldAlert" />,
      name: t('privacy_policy'),
      type: 'sub',
      action: () => navigation.navigate('PrivacyPolicy')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="Settings" />,
      name: t('settings'),
      type: 'sub',
      action: () => navigation.navigate('Settings')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="Languages" />,
      name: t('languages'),
      type: 'sub',
      value: language.value,
      action: () => navigation.navigate('SettingLanguage')
    },
    {
      icon: <Icon size={28} color={configs.primary[500]} name="Palette" />,
      name: t('themes'),
      type: 'sub',
      value: theme.value,
      action: () => navigation.navigate('SettingTheme')
    }
  ];

  const handleSignOut = () => {
    authState.reset();
    GoogleSignin.signOut();
    LoginManager.logOut();
    mutation.mutate();
    hideGlobalModal('modal-confirm');
  };

  return (
    <>
      <Box padding={0} style={[ds.rounded16, ds.overflowHidden]}>
        <Divider height={14} />
        <ProfileAvatar />
        <ProfileActionList items={profileActions} style={ds.mt14} />
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.gap10, ds.p20]}
          onPress={() => {
            showGlobalModal({
              modalKey: 'modal-confirm',
              component: (
                <ModalConfirm
                  visible={true}
                  title={t('signout_confirm_title')}
                  message={t('signout_confirm_message')}
                  btnConfirmText={t('confirm')}
                  btnCancelText={t('cancel')}
                  onConfirm={handleSignOut}
                  onCancel={() => hideGlobalModal('modal-confirm')}
                />
              ),
              hideClose: true
            });
          }}
        >
          <Icon size={28} color={Colors.red[500]} name="LogOut" />
          <Text fontWeight="Bold" color={Colors.red[500]}>
            {t('signout')}
          </Text>
        </Pressable>
      </Box>
      <ProfileVersion style={ds.mt10} />
    </>
  );
};

export default Profile;
