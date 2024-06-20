import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import {
  AccommodationParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';
import AccommodationsRoot from '@/modules/travel-accommodations/components/accommodation-root';

type Props = CompositeScreenProps<
  StackScreenProps<AccommodationParamList, 'Accommodations'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function AccommodationsScreen({ route }: Props) {
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]}>
        <AccommodationsRoot />
      </ScrollView>
    </View>
  );
}

export default AccommodationsScreen;
