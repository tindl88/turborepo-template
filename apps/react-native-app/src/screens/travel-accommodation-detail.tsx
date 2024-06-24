import React from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import NavigationHeader from '@/modules/navigation/components/navigation-header';
import { TravelAccommodationStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import AccommodationDetailRoot from '@/modules/travel-accommodations/components/accommodation-detail-root';

function AccommodationDetailScreen({ navigation, route }: TravelAccommodationStackProps<'AccommodationDetail'>) {
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
      <AccommodationDetailRoot routeParams={route.params} style={ds.flex1} />
    </View>
  );
}

export default AccommodationDetailScreen;
