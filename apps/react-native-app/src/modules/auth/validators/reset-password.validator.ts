import { z } from 'zod';

export const resetPasswordValidator = z.object({
  email: z.string({ invalid_type_error: 'validator_email_is_invalid' }).min(1, 'validator_at_least_n_character')
});
