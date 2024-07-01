import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

type ProfileCoverProps = {
  user: UserEntity;
} & ComponentBaseProps;

const ProfileCover: FC<ProfileCoverProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        'h-32 rounded-t-lg',
        'animate-gradient bg-[linear-gradient(-45deg,_#ee7752,_#e73c7e,_#23a6d5,_#23d5ab)] bg-[length:400%_400%]',
        className
      )}
    ></div>
  );
};

export default ProfileCover;
