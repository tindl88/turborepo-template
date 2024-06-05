import React, { FC } from 'react';

import { useAuthState } from '@/modules/auth/states/auth.state';

import ProfileForm from './profile-form';

type ProfileEditProps = {};

const ProfileEdit: FC<ProfileEditProps> = () => {
  const authState = useAuthState();

  return <ProfileForm data={authState.auth} />;
};

export default ProfileEdit;
