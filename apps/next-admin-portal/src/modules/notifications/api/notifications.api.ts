import { SendNotificationDto } from '../interfaces/notifications.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import axiosClient from '@/http/http-request';

export const send = (sendNotificationDto: SendNotificationDto) => {
  // FIXME: Fix type
  return axiosClient.post<unknown>(`${API_ENDPOINTS.NOTIFICATIONS}/send`, sendNotificationDto);
};

const NotificationApi = { send };

export default NotificationApi;
