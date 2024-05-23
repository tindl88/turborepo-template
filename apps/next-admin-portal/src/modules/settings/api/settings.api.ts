import { PreferenceResponse, UpdatePreferenceDto } from '../interfaces/settings.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import HttpRequest from '@/http/http-request';

export const updatePreference = (updatePreferenceDto: UpdatePreferenceDto) => {
  return HttpRequest.patch<PreferenceResponse>(API_ENDPOINTS.USER_PREFERENCES, updatePreferenceDto);
};

const SettingApi = { updatePreference };

export default SettingApi;
