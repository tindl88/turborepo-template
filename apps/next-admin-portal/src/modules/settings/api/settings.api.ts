import { PreferenceResponse, UpdatePreferenceDto } from '../interfaces/settings.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const updatePreference = (updatePreferenceDto: UpdatePreferenceDto) => {
  return axiosClient.patch<PreferenceResponse>(API_ENDPOINTS.USER_PREFERENCES, updatePreferenceDto);
};

const SettingApi = { updatePreference };

export default SettingApi;
