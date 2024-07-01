import React, { FC } from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import Box from '@/components/box';

import ProfileApi from '../api/profile.api';

import ProfileAvatar from './profile-avatar';
import ProfileCover from './profile-cover';
import ProfileName from './profile-name';

const ProfileRoot: FC<ComponentBaseProps> = ({ className }) => {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await ProfileApi.me();

      return res.data.data;
    },
    gcTime: 0
  });

  if (!user) return null;

  return (
    <div className={classNames(className)}>
      <ProfileCover user={user} />
      <Box flat={true}>
        <div className="relative flex">
          <ProfileAvatar user={user} />
          <ProfileName user={user} />
        </div>
      </Box>
    </div>
  );
};

export default ProfileRoot;
