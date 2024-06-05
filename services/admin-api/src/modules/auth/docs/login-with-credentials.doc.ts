import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { USER_ROLE } from '@/modules/users/constants/user.constant';

export class LoginWithCredentialsDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Login successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      user: {
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        email: 'ammodesk@gmail.com',
        role: USER_ROLE.SUPER_ADMIN,
        name: 'My Name',
        avatar: null,
        accessToken: '<TOKEN>',
        refreshToken: '<TOKEN>'
      }
    }
  })
  data: unknown;
}
