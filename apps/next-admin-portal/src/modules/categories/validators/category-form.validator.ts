import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const categoryFormValidator = z.object({
  name: baseValidator.title
});
