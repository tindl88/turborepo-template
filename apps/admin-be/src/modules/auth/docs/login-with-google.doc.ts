import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { USER_ROLE } from '@/modules/users/constants/user.constant';

export class LoginWithGoogleDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Login successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      user: {
        id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
        email: 'ammodesk@gmail.com',
        role: USER_ROLE.SUPER_ADMIN,
        name: 'My Name',
        avatar: '<AVATAR>',
        accessToken: '<TOKEN>',
        refreshToken: '<TOKEN>'
      }
    }
  })
  data: unknown;
}
