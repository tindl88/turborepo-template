import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { UnauthenticatedParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import Heading from '@/components/core-ui/heading';
import Line from '@/components/core-ui/line';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';

import AppleSignIn from '@/modules/auth/components/apple-sign-in';
import FacebookSignIn from '@/modules/auth/components/facebook-sign-in';
import LoginForm from '@/modules/auth/components/form-login';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import { useTheme } from '@/modules/theme/components/provider';

type Props = StackScreenProps<UnauthenticatedParamList, 'Login'>;

function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { themeConfigs } = useTheme();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <GeneralNavigationHeader backgroundColor="transparent" leftFunc={() => navigation.goBack()} />
      <ScrollView style={[ds.flex1, ds.px12]}>
        <Heading
          as={'h1'}
          color={themeConfigs.foreground}
          text={t('login_title') || ''}
          style={[ds.textCenter, ds.mt20]}
        />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
          <AppleSignIn style={ds.grow} />
        </View>
        <Line style={ds.mt32} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt12ne]}>
          <Text
            color={themeConfigs.foreground}
            style={[ds.textCenter, ds.mt10ne, ds.p10, { backgroundColor: themeConfigs.background }]}
            fontWeight="Bold"
          >
            {t('or_continue_with')}
          </Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt20}>
          <LoginForm />
        </KeyboardAvoidingView>
        <View style={[ds.row, ds.justifyCenter, ds.mt32]}>
          <Text color={themeConfigs.foreground} fontWeight="Bold" onPress={() => navigation.navigate('ResetPassword')}>
            {t('reset_password')}
          </Text>
        </View>
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32]}>
          <Text color={themeConfigs.foreground} style={[ds.fontMedium]}>
            {t('no_account')}
          </Text>
          <Text
            color={themeConfigs.foreground}
            fontWeight="Bold"
            style={ds.ml4}
            onPress={() => navigation.navigate('Register')}
          >
            {t('sign_up')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
