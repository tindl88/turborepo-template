import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Divider from '@/components/core-ui/divider';
import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import ResetPasswordForm from '@/modules/auth/components/form-reset-password';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';

type Props = StackScreenProps<UnauthenticatedParamList, 'ResetPassword'>;

function ResetPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader backgroundColor="transparent" borderColor="transparent" leftFunc={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={ds.p14}>
        <Heading text={t('forgot_password_title')} style={ds.textCenter} />
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
