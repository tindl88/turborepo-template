import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Box from '@/components/box';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';
import SafeViewArea from '@/components/safe-view-area';

import { AuthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';
import TermsAndConditions from '@/modules/terms-and-conditions/components/terms-and-conditions';

function TermsAndConditionsScreen({ route }: AuthenticatedStackProps<'TermsAndConditions'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <SafeViewArea spacingBottom={true}>
        <Box hasBg={false} style={ds.flex1}>
          <Box style={ds.flex1}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TermsAndConditions />
            </ScrollView>
          </Box>
        </Box>
      </SafeViewArea>
    </View>
  );
}

export default TermsAndConditionsScreen;
