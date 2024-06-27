import { z } from 'zod';

import { baseValidator } from '~shared-universal/validators/zod';

export const forgotPasswordValidator = z.object({
  email: baseValidator.email
});
