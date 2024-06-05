import { z } from 'zod';

export const updateProfileValidator = z.object({
  name: z.string().min(1, 'Tên phải nhập ít nhất 1 ký tự.').max(25, 'Tên không được nhập quá 25 ký tự.')
});
