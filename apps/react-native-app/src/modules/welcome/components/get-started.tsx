import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Colors, ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { UnauthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';

type GetStartedProps = {};

const GetStarted: FC<GetStartedProps> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<UnauthenticatedNavigationProps>();

  return (
    <View style={[ds.absolute, ds.bottom40, ds.wFull, ds.px14]}>
      <Button size="lg" style={ds.wFull} onPress={() => navigation.navigate('Login')}>
        {t('get_started').toUpperCase()}
      </Button>
      <Text
        color={Colors.white}
        style={[ds.wFull, ds.textCenter, ds.mt20]}
        onPress={() => navigation.navigate('Login')}
      >
        {t('i_already_have_account')}
      </Text>
    </View>
  );
};

export default GetStarted;
