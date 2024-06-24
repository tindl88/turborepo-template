import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const userFormValidator = z.object({
  name: baseValidator.userName,
  status: baseValidator.status,
  phoneNumber: baseValidator.phoneNumber,
  email: baseValidator.email,
  role: baseValidator.role
});
