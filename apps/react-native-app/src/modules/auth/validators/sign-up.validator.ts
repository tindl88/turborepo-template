import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const signUpValidator = z
  .object({
    name: baseValidator.userName,
    email: baseValidator.email,
    password: baseValidator.password,
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'validator_password_do_not_match',
    path: ['confirmPassword']
  });
