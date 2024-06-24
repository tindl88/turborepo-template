import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { TravelAccommodationStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import { useThemeState } from '@/modules/theme/states/theme.state';
import AccommodationsRoot from '@/modules/travel-accommodations/components/accommodation-root';

function AccommodationsScreen({ route }: TravelAccommodationStackProps<'Accommodations'>) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]}>
        <AccommodationsRoot />
      </ScrollView>
    </View>
  );
}

export default AccommodationsScreen;
