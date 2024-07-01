import { ResponseFormat } from '@/interfaces/api-response.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type ProfileResponse = ResponseFormat<UserEntity>;
