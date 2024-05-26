import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { UnauthenticatedParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
// import GeneralNavigationHeader from '@/components/common/header/general';
import { Divider, Heading, StatusBar, Text } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

import ResetPasswordForm from '@/modules/auth/components/form-reset-password';
import { useAuthState } from '@/modules/auth/states/auth.state';

type Props = StackScreenProps<UnauthenticatedParamList, 'ResetPassword'>;

function ResetPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const authState = useAuthState();

  useEffect(() => {
    if (authState.resetPasswordAt) {
      navigation.navigate('VerifyOtp');
    }
  }, [authState.resetPasswordAt]);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader leftFunc={() => navigation.goBack()} />
      <ScrollView style={[ds.flex1, ds.px12]}>
        <Heading as={'h1'} text={t('forgot_password_title')} style={[ds.textCenter, ds.mt20]} />
        <View style={ds.mt20}>
          <Text style={[ds.fontMedium]}>{t('forgot_password_desc')}</Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt32}>
          <ResetPasswordForm />
        </KeyboardAvoidingView>
        <Divider />
      </ScrollView>
    </View>
  );
}

export default ResetPasswordScreen;
