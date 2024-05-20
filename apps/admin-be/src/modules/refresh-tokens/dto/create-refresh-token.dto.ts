import { IsNotEmpty, IsOptional } from 'class-validator';

import { User } from '@/modules/users/entities/user.entity';

export class CreateRefreshTokenDto {
  @IsNotEmpty()
  token: string;

  @IsOptional()
  createdByIp?: string;

  @IsOptional()
  revokedByIp?: string;

  @IsOptional()
  revokedAt?: Date;

  @IsNotEmpty()
  userAgent: string;

  user: User;
}
