import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const postFormValidator = z.object({
  name: baseValidator.title,
  slug: baseValidator.content,
  description: baseValidator.content,
  body: baseValidator.content,
  status: baseValidator.content,
  cover: z.string(),
  images: baseValidator.uuidArray,
  categoryId: z.string()
});
