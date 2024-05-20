import { z } from 'zod';

export const updateAppearanceValidator = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.'
  }),
  language: z.string({
    required_error: 'Please select a language'
  })
});
