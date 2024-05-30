import React, { FC } from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { ds } from '@/design-system';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useAuthState } from '@/modules/auth/states/auth.state';

type ProfileAvatarProps = {};

const ProfileAvatar: FC<ProfileAvatarProps> = () => {
  const authState = useAuthState();

  return (
    <View>
      <View style={ds.itemsCenter}>
        <View style={ds.itemsCenter}>
          <FastImage
            style={[ds.w112, ds.h112, ds.roundedFull, ds.border2, ds.borderWhite, ds.mb10] as ImageStyle}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }}
          />
          <Text fontSize={20} fontWeight="Bold">
            {authState.auth?.user.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileAvatar;
