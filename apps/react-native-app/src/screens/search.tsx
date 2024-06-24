import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import Box from '@/components/box';
import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';
import SearchBox from '@/components/search-box';

import { AuthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import { useThemeState } from '@/modules/theme/states/theme.state';

function SearchScreen({ route }: AuthenticatedStackProps<'Search'>) {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <Box hasBg={false}>
        <SearchBox value={''} />
      </Box>
      <Heading>Recently Search:</Heading>
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]} />
    </View>
  );
}

export default SearchScreen;
