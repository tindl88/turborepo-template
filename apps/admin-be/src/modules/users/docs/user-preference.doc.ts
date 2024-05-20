import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';

import { USER_GENDER, USER_ROLE, USER_STATUS } from '../constants/user.constant';
import { USER_PREFERENCE_COLOR_SCHEME, USER_PREFERENCE_LANGUAGE } from '../constants/user-preference.constant';

export class UpdateUserPreferenceSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Update user preference successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      statusCode: 200,
      message: 'Update user preference successfully',
      data: {
        id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
        createdAt: '2024-02-19T09:23:09.298Z',
        updatedAt: '2024-02-19T23:06:14.537Z',
        name: 'Ammodesk',
        email: 'ammodesk@gmail.com',
        avatar: null,
        phoneNumber: null,
        emailVerified: null,
        recoveryCode: null,
        recoveredAt: null,
        locale: null,
        lastLogin: null,
        providerAccountId: null,
        provider: AUTH_PROVIDER.CREDENTIALS,
        authType: AUTH_TYPE.CREDENTIALS,
        gender: USER_GENDER.OTHER,
        status: USER_STATUS.ACTIVE,
        role: USER_ROLE.SUPER_ADMIN,
        preference: {
          language: USER_PREFERENCE_LANGUAGE.UNITED_STATES,
          theme: USER_PREFERENCE_COLOR_SCHEME.DARK,
          id: 'b68992bc-cc29-4137-9894-1a2fe4855ca2'
        }
      }
    }
  })
  data: unknown;
}

export class UpdateUserPreferenceBadRequestDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Data should not be empty' })
  message: string;

  @ApiProperty({ type: String, example: 'Bad Request' })
  error: string;
}

export class UserPreferenceNotFoundDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'User not found' })
  message: string;

  @ApiProperty({ type: String, example: 'Not Found' })
  error: string;
}
