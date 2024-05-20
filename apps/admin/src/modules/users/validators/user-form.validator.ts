import { z } from 'zod';

export const userFormValidator = z.object({
  name: z.string({ required_error: 'Vui lòng nhập tên' }).min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  status: z.string({ required_error: 'Vui lòng nhập trạng thái' }).min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  phoneNumber: z.string().min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  email: z.string().email('Email không hợp lệ'),
  role: z.enum(['user', 'admin', 'super_admin'], {
    required_error: 'Bạn chưa chọn quyền.'
  })
});
