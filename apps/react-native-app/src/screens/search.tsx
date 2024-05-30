import React from 'react';
import { ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

type Props = StackScreenProps<AuthenticatedParamList, 'Search'>;

function SearchScreen({}: Props) {
  const { themeConfigs } = useTheme();
  const screenState = useScreenState();

  return (
    <View style={[ds.flex1, styles.background(themeConfigs.background)]}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default SearchScreen;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return {
      backgroundColor: color
    };
  }
});
