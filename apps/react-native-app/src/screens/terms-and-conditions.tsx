import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Box from '@/components/common/box';
import GeneralNavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  AuthenticatedParamList,
  TravelBottomTabParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import TermsAndConditions from '@/modules/terms-and-conditions/components/terms-and-conditions';

type Props = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, 'TermsAndConditions'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>
>;

function TermsAndConditionsScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TermsAndConditions />
          </ScrollView>
        </Box>
      </Box>
    </View>
  );
}

export default TermsAndConditionsScreen;
