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
      <ScrollView showsVerticalScrollIndicator={false} style={ds.p14}>
        <Heading text={t('sign_up_title') || ''} style={ds.textCenter} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
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
        <KeyboardAvoidingView enabled behavior="padding">
          <RegisterForm />
        </KeyboardAvoidingView>
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32]}>
          <Text>{t('already_have_account')}</Text>
          <Text fontWeight="Bold" style={ds.ml4} onPress={() => navigation.navigate('Login')}>
            {t('sign_in')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
