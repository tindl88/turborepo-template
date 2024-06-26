import React, { useEffect } from 'react';
import { ds } from '~react-native-design-system';

import Loading from '@/components/core-ui/loading';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { AuthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';

function PreloadScreen({ navigation }: AuthenticatedStackProps<'Preload'>) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TravelDrawer', { screen: 'TravelBottomTabStack' });
    }, 1000);
  }, [navigation]);

  return (
    <View style={[ds.flex1, ds.itemsCenter, ds.justifyCenter]}>
      <StatusBar visible={false} />
      <Loading size={60} thickness={8} />
    </View>
  );
}

export default PreloadScreen;
