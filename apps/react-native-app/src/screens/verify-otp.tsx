import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import VerifyOtpForm from '@/modules/auth/components/form-verify-otp';
import { UnauthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';

function RegisterScreen({ navigation }: UnauthenticatedStackProps<'VerifyOtp'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader backgroundColor="transparent" borderColor="transparent" leftFunc={() => navigation.goBack()} />
      <KeyboardAvoidingView enabled style={ds.flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} style={ds.px14}>
          <Heading text={t('verification_otp_title')} style={ds.textCenter} />
          <Text fontWeight="Medium" style={ds.my32}>
            <Trans
              i18nKey="verification_otp_desc"
              values={{ email: 'ammodesk@gmail.com' }}
              components={{ bold: <Text fontWeight="Bold" /> }}
            />
          </Text>
          <VerifyOtpForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default RegisterScreen;
