import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, View} from 'react-native';

import VerifyOtpForm from '@/modules/auth/components/form-verify-otp';
import {useAuthState} from '@/modules/auth/states/auth.state';

import GeneralNavigationHeader from '@/components/common/header/general';
import {Heading, StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {UnauthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<UnauthenticatedParamList, 'VerifyOtp'>;

function RegisterScreen({navigation}: Props) {
  const {t} = useTranslation();
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
      <ScrollView style={[ds.flex1, ds.px12]} keyboardShouldPersistTaps="handled">
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
