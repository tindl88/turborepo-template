import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';

import {useScreenState} from '@/modules/screen/states/screen.state';

// import {useThemeState} from '@/modules/themes/states/themes.state';
import NavigationHeader from '@/components/common/header/general';
import {StatusBar} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {AuthenticatedParamList} from '@/common/interfaces';

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
