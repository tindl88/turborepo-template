import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

type ProfileNameProps = {
  user: UserEntity;
} & ComponentBaseProps;

const ProfileName: FC<ProfileNameProps> = ({ className, user }) => {
  return (
    <div className={classNames(className)}>
      <h3 className="text-2xl font-bold">{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default ProfileName;
