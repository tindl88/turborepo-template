import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Box from '@/components/common/box';
import NavigationHeader from '@/components/common/header/general';
import Divider from '@/components/core-ui/divider';
import Heading from '@/components/core-ui/heading';
import Link from '@/components/core-ui/link';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';

import {
  AuthenticatedParamList,
  NotificationParamList,
  TravelDrawerParamList
} from '@/modules/navigation/interfaces/navigation.interface';
import NotificationsRoot from '@/modules/notifications/components/notifications-root';
import { useThemeState } from '@/modules/theme/states/theme.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<NotificationParamList, 'Notifications'>,
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, StackScreenProps<AuthenticatedParamList>>
>;

function NotificationsScreen({ route }: Props) {
  const { configs } = useThemeState();

  const backgroundColor = configs.background;

  return (
    <View style={[ds.flex1, dynamicStyles.background(backgroundColor)]}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <View style={[ds.row, ds.itemsCenter, ds.justifyBetween]}>
            <Heading as="h4" fontWeight="Medium" text="Account Notifications" />
            <Link text="See All" color={configs.primary} onPress={() => {}} />
          </View>
          <Divider height={20} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <NotificationsRoot />
          </ScrollView>
        </Box>
      </Box>
    </View>
  );
}

export default NotificationsScreen;
