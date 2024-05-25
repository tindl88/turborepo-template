import * as zod from 'zod';

export const resetPasswordValidator = zod.object({
  email: zod
    .string({
      required_error: 'Vui lòng nhập email',
      invalid_type_error: 'Email không hợp lệ'
    })
    .min(1, 'Vui lòng nhập ít nhất 1 ký tự.')
});
