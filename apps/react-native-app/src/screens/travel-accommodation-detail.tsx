import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  AccommodationParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import AccommodationDetailRoot from '@/modules/travel-accommodations/components/accommodation-detail-root';

type Props = CompositeScreenProps<
  StackScreenProps<AccommodationParamList, 'AccommodationDetail'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function AccommodationDetailScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <AccommodationDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default AccommodationDetailScreen;
