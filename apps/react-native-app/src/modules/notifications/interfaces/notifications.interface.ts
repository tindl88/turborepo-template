import { ResponseFormat } from '@/interfaces/api-response.interface';

import { NOTIFICATION_TYPE } from '../constants/notification.constant';

export type NotificationEntity = {
  id: string;
  title: string;
  message: string;
  type: NOTIFICATION_TYPE;
  isRead: boolean;
  createdAt: Date;
};

export type PostsResponse = ResponseFormat<NotificationEntity[]>;
export type PostResponse = ResponseFormat<NotificationEntity>;
