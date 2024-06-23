import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  TourParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import TourDetailRoot from '@/modules/travel-tours/components/tour-detail-root';

type Props = CompositeScreenProps<
  StackScreenProps<TourParamList, 'TourDetail'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function TourDetailScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <TourDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default TourDetailScreen;
