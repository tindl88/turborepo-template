import { ProfileResponse, UpdateProfileDto } from '../interfaces/profile.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import HttpRequest from '@/http/http-request';

export const updateProfile = (updateProfileDto: UpdateProfileDto) => {
  return HttpRequest.patch<ProfileResponse>(API_ENDPOINTS.PROFILE, updateProfileDto);
};

export const getMe = () => {
  return HttpRequest.get<ProfileResponse>(API_ENDPOINTS.ME);
};

const ProfileApi = { updateProfile, getMe };

export default ProfileApi;
