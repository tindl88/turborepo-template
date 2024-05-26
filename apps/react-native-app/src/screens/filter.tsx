import React from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import { StatusBar } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

type Props = StackScreenProps<AuthenticatedParamList, 'Filter'>;

function FilterScreen({}: Props) {
  return (
    <View style={ds.flex1}>
      {Platform.OS === 'android' && <StatusBar />}
      <NavigationHeader title="My Filter" />
      <ScrollView style={ds.flex1} />
    </View>
  );
}

export default FilterScreen;