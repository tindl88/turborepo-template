import { UpdateDeviceTokenResponse } from '../interfaces/users.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const updateDeviceToken = (deviceToken: string) => {
  return axiosClient.patch<UpdateDeviceTokenResponse>(API_ENDPOINTS.DEVICE_TOKEN, { deviceToken });
};

const UserApi = { updateDeviceToken };

export default UserApi;
