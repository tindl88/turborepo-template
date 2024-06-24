import React from 'react';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { TravelAccommodationStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import AccommodationDetailRoot from '@/modules/travel-accommodations/components/accommodation-detail-root';

function AccommodationDetailScreen({ route }: TravelAccommodationStackProps<'AccommodationDetail'>) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <AccommodationDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default AccommodationDetailScreen;
