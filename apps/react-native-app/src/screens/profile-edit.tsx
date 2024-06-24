import React from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import Box from '@/components/box';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { ProfileStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import ProfileEditRoot from '@/modules/profile/conponents/profile-edit-root';

import { getHeaderTitle } from '@/utils/header-title.util';

function ProfileEditScreen({ route }: ProfileStackProps<'ProfileEdit'>) {
  const { t } = useTranslation();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <ProfileEditRoot />
        </Box>
      </Box>
    </View>
  );
}

export default ProfileEditScreen;
