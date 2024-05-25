import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, View} from 'react-native';

import AppleSignIn from '@/modules/auth/components/apple-sign-in';
import FacebookSignIn from '@/modules/auth/components/facebook-sign-in';
import LoginForm from '@/modules/auth/components/form-login';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import {useThemeState} from '@/modules/themes/states/themes.state';

import GeneralNavigationHeader from '@/components/common/header/general';
import {Heading, StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';
import {Line} from '@/components/ui/line';

import {UnauthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<UnauthenticatedParamList, 'Login'>;

function LoginScreen({navigation}: Props) {
  const {t} = useTranslation();
  const themeState = useThemeState();

  const backgroundColor = themeState.configs?.background;

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader leftFunc={() => navigation.goBack()} />
      <ScrollView style={[ds.flex1, ds.px12]}>
        <Heading as={'h1'} text={t('login_title') || ''} style={[ds.textCenter, ds.mt20]} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
          <AppleSignIn style={ds.grow} />
        </View>
        <Line style={ds.mt32} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt12ne]}>
          <Text style={[ds.textCenter, ds.fontBold, ds.mt10ne, ds.p10, {backgroundColor}]}>
            {t('or_continue_with')}
          </Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt20}>
          <LoginForm />
        </KeyboardAvoidingView>
        <View style={[ds.row, ds.justifyCenter, ds.mt32]}>
          <Text style={[ds.fontBold]} onPress={() => navigation.navigate('ResetPassword')}>
            {t('reset_password')}
          </Text>
        </View>
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32]}>
          <Text style={[ds.fontMedium]}>{t('no_account')}</Text>
          <Text style={[ds.fontBold, ds.ml4]} onPress={() => navigation.navigate('Register')}>
            {t('sign_up')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
