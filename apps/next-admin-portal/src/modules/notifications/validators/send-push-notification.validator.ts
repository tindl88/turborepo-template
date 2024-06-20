import { z } from 'zod';

export const sendPushNotificationValidator = z.object({
  title: z.string().min(1, 'validator_at_least_n_character'),
  content: z.string().min(1, 'validator_at_least_n_character')
});
