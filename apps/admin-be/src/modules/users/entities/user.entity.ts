import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities/abstract.entity';

import { AuditLog } from '@/modules/audit-logs/entities/audit-log.entity';
import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { Post } from '@/modules/posts/entities/post.entity';
import { Product } from '@/modules/products/entities/product.entity';
import { RefreshToken } from '@/modules/refresh-tokens/entities/refresh-token.entity';
import { UserPreference } from '@/modules/users/entities/user-preference.entity';

import { USER_GENDER, USER_ROLE, USER_STATUS } from '../constants/user.constant';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  emailVerified?: boolean;

  @Column({ nullable: true })
  recoveryCode?: string;

  @Column({ nullable: true })
  recoveredAt?: Date;

  @Column({ nullable: true })
  locale?: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  lastLogin?: Date;

  @Column({ nullable: true })
  providerAccountId?: string;

  @Column({ type: 'enum', enum: AUTH_PROVIDER, default: AUTH_PROVIDER.CREDENTIALS })
  provider: AUTH_PROVIDER;

  @Column({ type: 'enum', enum: AUTH_TYPE, default: AUTH_TYPE.CREDENTIALS })
  authType: AUTH_TYPE;

  @Column({ type: 'enum', enum: USER_GENDER, default: USER_GENDER.MALE })
  gender: USER_GENDER;

  @Column({ type: 'enum', enum: USER_STATUS, default: USER_STATUS.INACTIVE })
  status: USER_STATUS;

  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE;

  @OneToMany(() => Post, post => post.creator)
  posts: Post[];

  @OneToMany(() => Product, product => product.creator)
  products: Product[];

  @OneToMany(() => AuditLog, auditLog => auditLog.user)
  auditLogs: AuditLog[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => UserPreference, userPreference => userPreference.user)
  @JoinColumn()
  preference: UserPreference;
}
