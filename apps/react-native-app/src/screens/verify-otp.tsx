import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import VerifyOtpForm from '@/modules/auth/components/form-verify-otp';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';

type Props = StackScreenProps<UnauthenticatedParamList, 'VerifyOtp'>;

function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader leftFunc={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled" style={[ds.flex1, ds.px12]}>
        <Heading as={'h1'} text={t('verification_title')} style={[ds.textCenter, ds.mt20]} />
        <Text>We've send you the verification code to email: ammodesk@gmail.com</Text>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt20}>
          <VerifyOtpForm />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
