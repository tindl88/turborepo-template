import { z } from 'zod';

import { baseValidator } from '~shared-universal/validators/zod';

export const updateProfileValidator = z.object({
  name: baseValidator.userName,
  phoneNumber: baseValidator.phoneNumber
});
