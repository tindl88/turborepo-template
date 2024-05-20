import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { USER_GENDER, USER_ROLE, USER_STATUS } from '@/modules/users/constants/user.constant';

import { AUTH_PROVIDER, AUTH_TYPE } from '../constants/auth.constant';

export class SignUpDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create account successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      name: 'My Name',
      email: 'ammodesk@gmail.com',
      avatar: '',
      phoneNumber: '',
      emailVerified: false,
      locale: '',
      providerAccountId: '',
      provider: AUTH_PROVIDER.CREDENTIALS,
      authType: AUTH_TYPE.CREDENTIALS,
      gender: USER_GENDER.OTHER,
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.ADMIN,
      updatedAt: '2023-12-05T23:44:49.288Z',
      lastLogin: null,
      id: 'd5866027-6393-4f33-9b83-c62b251b639f',
      createdAt: '2023-12-05T23:44:49.288Z'
    }
  })
  data: unknown;
}
