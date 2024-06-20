import { ResponseFormat } from '@/interfaces/api-response.interface';

export type PreferenceEntity = {
  theme: string;
  language: string;
  themeColor: string;
};

export type UpdatePreferenceDto = Partial<PreferenceEntity>;

export type PreferenceResponse = ResponseFormat<PreferenceEntity>;
