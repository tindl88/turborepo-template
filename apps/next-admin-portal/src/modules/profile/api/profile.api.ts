import { ProfileResponse } from '../interfaces/profile.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const me = () => {
  return axiosClient.get<ProfileResponse>(`${API_ENDPOINTS.ME}`);
};

const ProfileApi = { me };

export default ProfileApi;
