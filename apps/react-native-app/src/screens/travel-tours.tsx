import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import NavigationHeader from '@/modules/navigation/components/navigation-header';
import { TravelTourStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import { useThemeState } from '@/modules/theme/states/theme.state';
import ToursRoot from '@/modules/travel-tours/components/tours-root';

function ToursScreen({ route }: TravelTourStackProps<'Tours'>) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]}>
        <ToursRoot />
      </ScrollView>
    </View>
  );
}

export default ToursScreen;
