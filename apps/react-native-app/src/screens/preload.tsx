import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';

import {Loading, StatusBar} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {AuthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<AuthenticatedParamList, 'Preload'>;

function PreloadScreen({navigation}: Props) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeStack');
    }, 1000);
  }, [navigation]);

  return (
    <View style={[ds.flex1, ds.itemsCenter, ds.justifyCenter]}>
      <StatusBar visible={false} />
      <Loading size={48} thickness={8} />
    </View>
  );
}

export default PreloadScreen;
