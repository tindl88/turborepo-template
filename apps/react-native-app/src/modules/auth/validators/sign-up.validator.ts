import { z } from 'zod';

export const signUpValidator = z
  .object({
    name: z.string().min(1, 'Tên phải nhập ít nhất 1 ký tự.').max(25, 'Tên không được nhập quá 25 ký tự.'),
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])(?=.*[0-9]).{6,}$/,
        'Password must contain at least one uppercase letter, one special character and one number'
      ),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });
