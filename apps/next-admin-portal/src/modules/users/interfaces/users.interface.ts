import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

import { USER_ROLE, USER_STATUS } from '../constants/users.constant';

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
  role: USER_ROLE;
  status: USER_STATUS;
};

export type UserFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: USER_STATUS;
};

export type UsersResponse = ResponseFormat<UserEntity[]>;
export type UserResponse = ResponseFormat<UserEntity>;

export type UserFilter = BaseFilter;
