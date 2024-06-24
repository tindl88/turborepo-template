import React from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import NavigationHeader from '@/modules/navigation/components/navigation-header';
import { TravelTourStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import TourDetailRoot from '@/modules/travel-tours/components/tour-detail-root';

function TourDetailScreen({ navigation, route }: TravelTourStackProps<'TourDetail'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar background="transparent" />
      <NavigationHeader
        backgroundColor="transparent"
        borderColor="transparent"
        title={t(getHeaderTitle(route.name))}
        leftFunc={() => navigation.goBack()}
      />
      <TourDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default TourDetailScreen;
