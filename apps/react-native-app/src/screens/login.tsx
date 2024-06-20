import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Heading from '@/components/core-ui/heading';
import Separator from '@/components/core-ui/separator';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import AppleSignIn from '@/modules/auth/components/apple-sign-in';
import FacebookSignIn from '@/modules/auth/components/facebook-sign-in';
import LoginForm from '@/modules/auth/components/form-login';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = StackScreenProps<UnauthenticatedParamList, 'Login'>;

function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader backgroundColor="transparent" borderColor="transparent" leftFunc={() => navigation.goBack()} />
      <ScrollView style={ds.p14} showsVerticalScrollIndicator={false}>
        <Heading text={t('login_title')} style={ds.textCenter} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
          <AppleSignIn style={ds.grow} />
        </View>
        <View style={[ds.itemsCenter, ds.justifyCenter, ds.mt44, ds.mb20]}>
          <Separator />
          <Text style={[ds.textCenter, ds.mt24ne, ds.p10, { backgroundColor: configs.background }]} fontWeight="Bold">
            {t('or_continue_with')}
          </Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding">
          <LoginForm />
        </KeyboardAvoidingView>
        <View style={[ds.row, ds.justifyCenter, ds.mt32]}>
          <Text fontWeight="Bold" onPress={() => navigation.navigate('ResetPassword')}>
            {t('reset_password')}
          </Text>
        </View>
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt10]}>
          <Text style={[ds.fontMedium]}>{t('no_account')}</Text>
          <Text fontWeight="Bold" style={ds.ml4} onPress={() => navigation.navigate('Register')}>
            {t('sign_up')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
