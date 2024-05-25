import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import WelcomePageSlider from '@/modules/welcome/components/page-slider';

// import WelcomeSlideshow from '@/modules/welcome/components/slide';
import {StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';
import {Button} from '@/components/ui/button';

import {UnauthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<UnauthenticatedParamList, 'Welcome'>;

function WelcomeScreen({navigation}: Props) {
  const {t} = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <View style={[ds.flex1, ds.px12]}>
        <View style={ds.grow}>
          <WelcomePageSlider />
        </View>
        <View style={ds.mb56}>
          <Button
            label={t('get_started').toUpperCase()}
            style={ds.wFull}
            onPress={() => navigation.navigate('Login')}
          />
          <Text style={[ds.wFull, ds.textCenter, ds.mt20]} onPress={() => navigation.navigate('Login')}>
            {t('i_already_have_account')}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default WelcomeScreen;
