import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Reset password successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      code: '12345'
    }
  })
  data: unknown;
}
