import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralNavigationHeader from '@/components/common/header/general';
import Heading from '@/components/core-ui/heading';
import Line from '@/components/core-ui/line';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import FacebookSignIn from '@/modules/auth/components/facebook-sign-in';
import GoogleSignIn from '@/modules/auth/components/google-sign-in';
import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = StackScreenProps<UnauthenticatedParamList, 'CreateNewPassword'>;

function CreateNewPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  const backgroundColor = configs.background;

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader leftFunc={() => navigation.goBack()} />
      <ScrollView style={[ds.flex1, ds.px12]}>
        <Heading as={'h1'} text={t('sign_up_title') || ''} style={[ds.textCenter, ds.mt20]} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt32, ds.gap14]}>
          <GoogleSignIn style={ds.grow} />
          <FacebookSignIn style={ds.grow} />
        </View>
        <Line style={ds.mt32} />
        <View style={[ds.row, ds.itemsCenter, ds.justifyCenter, ds.mt12ne]}>
          <Text style={[ds.textCenter, ds.fontBold, ds.mt10ne, ds.p10, { backgroundColor }]}>
            {t('or_continue_with_password')}
          </Text>
        </View>
        <KeyboardAvoidingView enabled behavior="padding" style={ds.mt20} />
        <View style={[ds.itemsCenter, ds.row, ds.justifyCenter, ds.mt32]}>
          <Text style={[ds.textGray50, ds.fontMedium]}>{t('already_have_account')}</Text>
          <Text style={[ds.textGray50, ds.fontBold, ds.ml4]} onPress={() => navigation.navigate('Login')}>
            {t('sign_in')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default CreateNewPasswordScreen;
