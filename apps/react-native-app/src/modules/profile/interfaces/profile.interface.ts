import { LucideProps } from 'lucide-react-native';

import { ResponseFormat } from '@/interfaces/api-response.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type ProfileAction = {
  icon?: React.ComponentType<LucideProps>;
  name: string;
  type: 'sub' | 'inline';
  value?: string | boolean;
  action: () => void;
};

export type UpdateProfileDto = {
  name: string;
  phoneNumber: string;
};

export type ProfileResponse = ResponseFormat<UserEntity>;
