import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import NavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  TourParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';
import TourDetailRoot from '@/modules/travel-tours/components/tour-detail-root';

type Props = CompositeScreenProps<
  StackScreenProps<TourParamList, 'TourDetail'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function TourDetailScreen({ route }: Props) {
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <ScrollView style={[ds.flex1, ds.p14]}>
        <TourDetailRoot routeParams={route.params} />
      </ScrollView>
    </View>
  );
}

export default TourDetailScreen;
