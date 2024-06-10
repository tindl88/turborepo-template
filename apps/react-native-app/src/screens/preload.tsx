import React, { useEffect } from 'react';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import Loading from '@/components/core-ui/loading';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { AuthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';

type Props = StackScreenProps<AuthenticatedParamList, 'Preload'>;

function PreloadScreen({ navigation }: Props) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TravelDrawer');
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
