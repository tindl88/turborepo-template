import { z } from 'zod';

import { baseValidator } from '~shared-universal/validators/zod';

export const resetPasswordValidator = z
  .object({
    otpCode: z.string().min(5).max(5),
    password: baseValidator.password,
    confirmPassword: z.string({ message: 'validator_password_do_not_match' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'validator_password_do_not_match',
    path: ['confirmPassword']
  });
