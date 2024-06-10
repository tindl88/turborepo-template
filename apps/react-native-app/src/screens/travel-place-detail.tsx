import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { HomeStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import TravelPlaceDetailRoot from '@/modules/travel-places/components/travel-place-detail-root';

function TravelPlaceDetailScreen({ route }: HomeStackProps<'TravelPlaceDetail'>) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <ScrollView style={[ds.flex1, ds.p14]}>
        <TravelPlaceDetailRoot routeParams={route.params} />
      </ScrollView>
    </View>
  );
}

export default TravelPlaceDetailScreen;
