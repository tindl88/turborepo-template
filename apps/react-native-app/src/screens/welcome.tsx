import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { UnauthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import WelcomeSlider from '@/modules/welcome/components/welcome-slider';

type Props = StackScreenProps<UnauthenticatedParamList, 'Welcome'>;

function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const toast = useToast();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <View style={[ds.flex1, ds.px12]}>
        <View style={ds.grow}>
          <WelcomeSlider />
        </View>
        <View style={ds.mb56}>
          <Button style={ds.wFull} onPress={() => navigation.navigate('Login')}>
            {t('get_started').toUpperCase()}
          </Button>
          <Button
            style={ds.wFull}
            onPress={() => {
              toast.show('This is a customized toast! you can implement your own', {
                type: 'custom_type',
                animationDuration: 100,
                data: {
                  title: 'Customized toast'
                }
              });
            }}
          >
            Show Toast
          </Button>
          <Text style={[ds.wFull, ds.textCenter, ds.mt20]} onPress={() => navigation.navigate('Login')}>
            {t('i_already_have_account')}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default WelcomeScreen;
