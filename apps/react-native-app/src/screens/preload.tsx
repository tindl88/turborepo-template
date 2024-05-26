import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import { Loading, StatusBar } from '@/components/core-ui';

type Props = StackScreenProps<AuthenticatedParamList, 'Preload'>;

function PreloadScreen({ navigation }: Props) {
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
