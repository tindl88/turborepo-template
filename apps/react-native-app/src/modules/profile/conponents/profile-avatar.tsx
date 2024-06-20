import React, { FC } from 'react';
import { ds } from '~react-native-design-system';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/core-ui/avatar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useAuthState } from '@/modules/auth/states/auth.state';

type ProfileAvatarProps = {};

const ProfileAvatar: FC<ProfileAvatarProps> = () => {
  const authState = useAuthState();

  const userAvatar = authState.auth?.avatar;
  const userName = authState.auth?.name;

  return (
    <View>
      <View style={ds.itemsCenter}>
        <View style={ds.itemsCenter}>
          <Avatar size={90}>
            <AvatarImage src={userAvatar} />
            <AvatarFallback fontSize={50} lineHeight={60}>
              {userName}
            </AvatarFallback>
          </Avatar>
          <Text style={ds.mt10} fontSize={20} fontWeight="Bold">
            {authState.auth?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileAvatar;
