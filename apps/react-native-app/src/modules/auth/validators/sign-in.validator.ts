import { z } from 'zod';

export const signInValidator = z.object({
  email: z
    .string({ required_error: 'Vui lòng nhập email', invalid_type_error: 'Email không hợp lệ' })
    .min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu', invalid_type_error: 'Mật khẩu không hợp lệ' })
    .min(6, 'Vui lòng nhập ít nhất 6 ký tự.')
    .max(50, 'Chỉ nhập tối đa 50 ký tự.')
});
