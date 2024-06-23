import React from 'react';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { HomeStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import TravelPlaceDetailRoot from '@/modules/travel-places/components/travel-place-detail-root';

function TravelPlaceDetailScreen({ route }: HomeStackProps<'TravelPlaceDetail'>) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <TravelPlaceDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default TravelPlaceDetailScreen;
