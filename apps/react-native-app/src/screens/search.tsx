import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

// import {useThemeState} from '@/modules/themes/states/themes.state';
import NavigationHeader from '@/components/common/header/general';
import { StatusBar } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = StackScreenProps<AuthenticatedParamList, 'Search'>;

function SearchScreen({}: Props) {
  const screenState = useScreenState();
  // const themeState = useThemeState();

  // const backgroundColor = themeState.configs?.background;

  return (
    <View style={[ds.flex1]}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default SearchScreen;
