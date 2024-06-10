import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralNavigationHeader from '@/components/common/header/general';
import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import VerifyOtpForm from '@/modules/auth/components/form-verify-otp';
import { useAuthState } from '@/modules/auth/states/auth.state';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';

type Props = StackScreenProps<UnauthenticatedParamList, 'VerifyOtp'>;

function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const authState = useAuthState();

  useEffect(() => {
    if (authState.verifyEmailOtpAt) {
      navigation.navigate('CreateNewPassword');
    }
  }, [authState.verifyEmailOtpAt]);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader leftFunc={() => navigation.goBack()} />
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
