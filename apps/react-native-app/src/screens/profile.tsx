import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { ProfileStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import ProfileRoot from '@/modules/profile/conponents/profile-root';

import { getHeaderTitle } from '@/utils/header-title.util';

function ProfileScreen({ route }: ProfileStackProps<'Profile'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <ScrollView showsVerticalScrollIndicator={false} style={ds.p14}>
        <ProfileRoot />
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
