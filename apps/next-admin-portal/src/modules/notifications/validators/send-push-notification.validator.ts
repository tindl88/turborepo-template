import { z } from 'zod';

export const sendPushNotificationValidator = z.object({
  title: z
    .string({
      required_error: 'Vui lòng nhập tiêu đề'
    })
    .min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  content: z
    .string({
      required_error: 'Vui lòng nhập nội dung'
    })
    .min(1, 'Vui lòng nhập ít nhất 1 ký tự.')
});
