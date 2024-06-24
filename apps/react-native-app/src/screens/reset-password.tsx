import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import ResetPasswordForm from '@/modules/auth/components/form-reset-password';
import NavigationHeader from '@/modules/navigation/components/navigation-header';
import { UnauthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';

function ResetPasswordScreen({ navigation }: UnauthenticatedStackProps<'ResetPassword'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader backgroundColor="transparent" borderColor="transparent" leftFunc={() => navigation.goBack()} />
      <KeyboardAvoidingView enabled style={ds.flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} style={ds.px14}>
          <Heading text={t('reset_password_title')} style={ds.textCenter} />
          <Text fontWeight="Medium" style={ds.my32}>
            {t('reset_password_desc')}
          </Text>
          <ResetPasswordForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default ResetPasswordScreen;
