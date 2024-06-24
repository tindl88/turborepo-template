import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProfileApi from '../api/profile.api';

import ProfileForm from './profile-form';

type ProfileEditRootProps = {};

const ProfileEditRoot: FC<ProfileEditRootProps> = () => {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => ProfileApi.me(),
    gcTime: 0,
    staleTime: 0
  });

  if (!data) return null;

  return <ProfileForm data={data.data.data} />;
};

export default ProfileEditRoot;
