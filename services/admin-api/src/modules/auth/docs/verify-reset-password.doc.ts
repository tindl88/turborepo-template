import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyResetPasswordDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Verify reset password successfully' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      status: 'success'
    }
  })
  data: unknown;
}
