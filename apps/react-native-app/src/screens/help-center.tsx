import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import Box from '@/components/common/box';
import GeneralNavigationHeader from '@/components/common/header/general';
import Divider from '@/components/core-ui/divider';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import SearchBox from '@/components/search-box';

import HelpCenter from '@/modules/help-center/components/help-center';
import { AuthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';

type Props = StackScreenProps<AuthenticatedParamList, 'HelpCenter'>;

function HelpCenterScreen({ route }: Props) {
  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={route.name} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <SearchBox value={''} onChange={_text => {}} />
          <Divider />
          <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
            <HelpCenter />
          </ScrollView>
        </Box>
      </Box>
    </View>
  );
}

export default HelpCenterScreen;
