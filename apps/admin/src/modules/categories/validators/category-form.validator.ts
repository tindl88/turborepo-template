import { z } from 'zod';

export const categoryFormValidator = z.object({
  name: z.string({ required_error: 'Vui lòng nhập tiêu đề' }).min(2, 'Vui lòng nhập ít nhất 2 ký tự.')
});
