import {ResponseFormat} from '@/common/interfaces';

import {USER_STATUS} from '../constants/users.constant';

export type UserEntity = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  password: string;
  provider: string;
  type: string;
  providerAccountId: string;
  phoneNumber: string;
  locale: string;
  status: USER_STATUS;
};

export type CreateUserDto = Omit<UserEntity, 'id'>;
export type UpdateUserDto = Partial<CreateUserDto>;

export type UsersResponse = ResponseFormat<UserEntity[]>;
export type UserResponse = ResponseFormat<UserEntity>;

export type CreateUserResponse = ResponseFormat<any>;
