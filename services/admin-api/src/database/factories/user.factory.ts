import { hashPassword } from '@/common/utils/password.util';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { USER_GENDER, USER_ROLE, USER_STATUS } from '@/modules/users/constants/user.constant';

import { IUserFactory } from '../interface';

export const userFactory: IUserFactory[] = [
  {
    id: '6090075c-a393-4a8e-96d5-db8f8d4a971f',
    name: 'Ammodesk',
    email: process.env.AP_USER_EMAIL,
    password: hashPassword(process.env.AP_USER_PASSWORD),
    gender: USER_GENDER.OTHER,
    status: USER_STATUS.ACTIVE,
    role: USER_ROLE.SUPER_ADMIN,
    provider: AUTH_PROVIDER.CREDENTIALS,
    authType: AUTH_TYPE.CREDENTIALS
  }
];
