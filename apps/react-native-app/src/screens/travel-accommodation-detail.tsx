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
  AccommodationParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';
import AccommodationDetailRoot from '@/modules/travel-accommodations/components/accommodation-detail-root';

type Props = CompositeScreenProps<
  StackScreenProps<AccommodationParamList, 'AccommodationDetail'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function AccommodationDetailScreen({ route }: Props) {
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]}>
        <AccommodationDetailRoot routeParams={route.params} />
      </ScrollView>
    </View>
  );
}

export default AccommodationDetailScreen;
