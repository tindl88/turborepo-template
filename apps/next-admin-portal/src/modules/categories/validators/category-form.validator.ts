import { z } from 'zod';

import { baseValidator } from '~shared-universal/validators/zod';

export const categoryFormValidator = z.object({
  name: baseValidator.title,
  slug: baseValidator.content,
  type: baseValidator.requireSelect,
  parentId: z.string()
});
