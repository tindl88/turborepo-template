import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
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
import RegisterForm from '@/modules/auth/components/form-register';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = StackScreenProps<UnauthenticatedParamList, 'Register'>;

function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader backgroundColor="transparent" borderColor="transparent" leftFunc={() => navigation.goBack()} />
      <KeyboardAvoidingView enabled style={ds.flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} style={ds.px14}>
          <Heading text={t('signup_title')} style={ds.textCenter} />
          <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
            <GoogleSignIn style={ds.px14} />
            <FacebookSignIn style={ds.px14} />
            <AppleSignIn style={ds.px14} />
          </View>
          <View style={[ds.itemsCenter, ds.justifyCenter, ds.mt44, ds.mb20]}>
            <Separator />
            <Text
              color={configs.foreground}
              style={[ds.textCenter, ds.mt24ne, ds.p10, { backgroundColor: configs.background }]}
              fontWeight="Bold"
            >
              {t('or_continue_with_password')}
            </Text>
          </View>

          <RegisterForm />

          <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32]}>
            <Text>{t('already_have_account')}</Text>
            <Text fontWeight="Bold" style={ds.ml4} onPress={() => navigation.navigate('Login')}>
              {t('signin')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default RegisterScreen;
