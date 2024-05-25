import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, View} from 'react-native';

import FacebookSignIn from '@/modules/auth/components/facebook-sign-in';
import RegisterForm from '@/modules/auth/components/form-register';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import {useThemeState} from '@/modules/themes/states/themes.state';

import GeneralNavigationHeader from '@/components/common/header/general';
import {Heading, StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';
import {Line} from '@/components/ui/line';

import {UnauthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<UnauthenticatedParamList, 'Register'>;

function RegisterScreen({navigation}: Props) {
  const {t} = useTranslation();
  const themeState = useThemeState();

  const backgroundColor = themeState.configs?.background;

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader leftFunc={() => navigation.goBack()} />
      <ScrollView style={[ds.flex1, ds.px12]}>
        <Heading as={'h1'} text={t('sign_up_title') || ''} style={[ds.textCenter, ds.mt20]} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
        </View>
        <Line style={ds.mt32} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt12ne]}>
          <Text style={[ds.textCenter, ds.fontBold, ds.mt10ne, ds.p10, {backgroundColor}]}>
            {t('or_continue_with_password')}
          </Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt20}>
          <RegisterForm />
        </KeyboardAvoidingView>
        <View style={[ds.itemsCenter, ds.row, ds.justifyCenter, ds.mt32]}>
          <Text style={[ds.textGray50, ds.fontMedium]}>{t('already_have_account')}</Text>
          <Text style={[ds.textGray50, ds.fontBold, ds.ml4]} onPress={() => navigation.navigate('Login')}>
            {t('sign_in')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
