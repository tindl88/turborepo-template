import { z } from 'zod';

import { baseValidator } from '~shared-validators/zod';

export const productFormValidator = z.object({
  name: baseValidator.title,
  slug: baseValidator.content,
  body: baseValidator.content,
  status: baseValidator.content,
  cover: z.string(),
  images: baseValidator.uuidArray
});
