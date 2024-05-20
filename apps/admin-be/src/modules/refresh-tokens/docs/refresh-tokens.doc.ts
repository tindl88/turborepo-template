import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRefreshTokenSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Refresh refresh token successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      accessToken: '<TOKEN>',
      refreshToken: '<TOKEN>'
    }
  })
  data: unknown;
}

export class RevokeRefreshTokenSuccessDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Revoke refresh token successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      status: 'success'
    }
  })
  data: unknown;
}
