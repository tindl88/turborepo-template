import { faker } from '@faker-js/faker';

import { hashPassword } from '@/common/utils/password.util';

import { IUserFactory } from '@/database/interface';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { USER_GENDER, USER_ROLE, USER_STATUS } from '@/modules/users/constants/user.constant';

const statuses = Object.values(USER_STATUS);
const genders = Object.values(USER_GENDER);
const roles = Object.values(USER_ROLE);

export function createRandomUser(): IUserFactory {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashPassword(process.env.AP_USER_PASSWORD),
    gender: genders[Math.floor(Math.random() * genders.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    phoneNumber: faker.phone.number(),
    provider: AUTH_PROVIDER.CREDENTIALS,
    authType: AUTH_TYPE.CREDENTIALS
  };
}

export const userFactory = faker.helpers.multiple(createRandomUser, {
  count: 30
});
