import { z } from 'zod';

export const postFormValidator = z.object({
  name: z.string({ required_error: 'Vui lòng nhập tiêu đề' }).min(2, 'Vui lòng nhập ít nhất 2 ký tự.'),
  slug: z.string({ required_error: 'Vui lòng nhập slug' }).min(2, 'Vui lòng nhập ít nhất 2 ký tự.'),
  description: z.string({ required_error: 'Vui lòng nhập mô tả' }).min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  body: z.string({ required_error: 'Vui lòng nhập nội dung' }).min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  status: z.string({ required_error: 'Vui lòng nhập trạng thái' }).min(1, 'Vui lòng nhập ít nhất 1 ký tự.'),
  cover: z.string(),
  images: z.object({ id: z.string().uuid({ message: 'It should be an UUID' }) }).array()
});
