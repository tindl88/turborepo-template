import { ProfileResponse, UpdateProfileDto } from '../interfaces/profile.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const updateProfile = (updateProfileDto: UpdateProfileDto) => {
  return axiosClient.patch<ProfileResponse>(API_ENDPOINTS.PROFILE, updateProfileDto);
};

export const me = () => {
  return axiosClient.get<ProfileResponse>(API_ENDPOINTS.ME);
};

const ProfileApi = { updateProfile, me };

export default ProfileApi;
