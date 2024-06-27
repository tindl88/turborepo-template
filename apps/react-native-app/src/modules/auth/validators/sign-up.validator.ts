import { z } from 'zod';

import { baseValidator } from '~shared-universal/validators/zod';

export const signUpValidator = z
  .object({
    name: baseValidator.userName,
    email: baseValidator.email,
    password: baseValidator.password,
    confirmPassword: z.string({ message: 'validator_password_do_not_match' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'validator_password_do_not_match',
    path: ['confirmPassword']
  });
