import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';

import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = StackScreenProps<AuthenticatedParamList, 'Search'>;

function SearchScreen({}: Props) {
  const screenState = useScreenState();

  return (
    <View style={[ds.flex1]}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default SearchScreen;
