import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends AbstractEntity {
  @Column()
  token: string;

  @Column()
  createdByIp: string;

  @Column({ nullable: true })
  revokedByIp?: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  revokedAt?: Date;

  @Column()
  userAgent: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
