import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';

import { USER_PREFERENCE_COLOR_SCHEME, USER_PREFERENCE_LANGUAGE } from '../constants/user-preference.constant';

@Entity({ name: 'user_preferences' })
export class UserPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: USER_PREFERENCE_LANGUAGE, default: USER_PREFERENCE_LANGUAGE.UNITED_STATES })
  language: USER_PREFERENCE_LANGUAGE = USER_PREFERENCE_LANGUAGE.UNITED_STATES;

  @Column({ type: 'enum', enum: USER_PREFERENCE_COLOR_SCHEME, default: USER_PREFERENCE_COLOR_SCHEME.DARK })
  theme: USER_PREFERENCE_COLOR_SCHEME = USER_PREFERENCE_COLOR_SCHEME.DARK;

  @OneToOne(() => User, user => user.preference)
  user: User;
}
