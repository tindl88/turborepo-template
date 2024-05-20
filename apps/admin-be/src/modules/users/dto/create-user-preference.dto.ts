import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { USER_PREFERENCE_COLOR_SCHEME, USER_PREFERENCE_LANGUAGE } from '../constants/user-preference.constant';

export class CreateUserPreferenceDto {
  @ApiProperty({ enum: USER_PREFERENCE_LANGUAGE, default: USER_PREFERENCE_LANGUAGE.UNITED_STATES })
  @IsEnum(USER_PREFERENCE_LANGUAGE)
  language: USER_PREFERENCE_LANGUAGE;

  @ApiProperty({ enum: USER_PREFERENCE_COLOR_SCHEME, default: USER_PREFERENCE_COLOR_SCHEME.DARK })
  @IsEnum(USER_PREFERENCE_COLOR_SCHEME)
  theme: USER_PREFERENCE_COLOR_SCHEME;
}
