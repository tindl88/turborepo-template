import React from 'react';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { TravelTourStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import TourDetailRoot from '@/modules/travel-tours/components/tour-detail-root';

function TourDetailScreen({ route }: TravelTourStackProps<'TourDetail'>) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <TourDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default TourDetailScreen;
