import { ResponseFormat } from '@/interfaces/api-response.interface';

export type Languages = 'en-us' | 'vi-vn';

export type PreferenceEntity = {
  theme: string;
  language: Languages;
  themeColor: string;
};

export type UpdatePreferenceDto = Partial<PreferenceEntity>;

export type PreferenceResponse = ResponseFormat<PreferenceEntity>;
