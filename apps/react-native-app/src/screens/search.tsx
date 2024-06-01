import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = StackScreenProps<AuthenticatedParamList, 'Search'>;

function SearchScreen({}: Props) {
  const { configs } = useThemeState();
  const screenState = useScreenState();

  return (
    <View style={[ds.flex1, dynamicStyles.background(configs.background)]}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default SearchScreen;
