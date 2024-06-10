import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { StackScreenProps } from '@react-navigation/stack';

import Box from '@/components/common/box';
import NavigationHeader from '@/components/common/header/general';
import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import SearchBox from '@/components/search-box';

import { AuthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = StackScreenProps<AuthenticatedParamList, 'Search'>;

function SearchScreen({ route }: Props) {
  const { configs } = useThemeState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <Box hasBg={false}>
        <SearchBox value={''} />
      </Box>
      <Heading>Recently Search:</Heading>
      <ScrollView showsVerticalScrollIndicator={false} style={[ds.p14]} />
    </View>
  );
}

export default SearchScreen;
