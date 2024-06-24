import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const signInValidator = z.object({
  email: baseValidator.email,
  password: baseValidator.password
});
