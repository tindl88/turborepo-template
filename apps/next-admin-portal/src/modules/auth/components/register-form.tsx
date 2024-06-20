'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~ui/components/ui/button';
import { Input } from '~ui/components/ui/input';

import { CreateUserDto } from '@/modules/users/interfaces/users.interface';

import { signUpValidator } from '../validators/sign-up.validator';

type RegisterFormValues = CreateUserDto & {
  confirmPassword?: string;
};

const RegisterForm = ({ ...rest }) => {
  const defaultValues = {
    name: 'Tin Tran',
    email: 'tinltin@gmail.com',
    password: 'Tintran123@',
    confirmPassword: 'Tintran123@',
    phoneNumber: '(84) 0984-8573'
  } as RegisterFormValues;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(signUpValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async formData => {
    delete formData.confirmPassword;
  };

  return (
    <div className="flex h-full grow items-center justify-center" data-testid="frm-register" {...rest}>
      <form
        className="w-full max-w-[400px] self-center rounded bg-white p-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Logo */}
        <div className="flex justify-center"></div>
        {/* Name */}
        <div>
          <label className="mb-1 block" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <Input {...register('name')} autoComplete="name" />
          {errors.name && <p className="text-sm text-red-500">{errors.name?.message}</p>}
        </div>
        {/* Email */}
        <div>
          <label className="mb-1 block" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <Input {...register('email')} autoComplete="username" />
          {errors.email && <p className="text-sm text-red-500">{errors.email?.message}</p>}
        </div>
        {/* Phone */}
        <div>
          <label className="mb-1 block" htmlFor="phone">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input {...register('phoneNumber')} autoComplete="phoneNumber" />
          {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber?.message}</p>}
        </div>
        {/* Mật khẩu */}
        <div className="mt-4">
          <label className="mb-1 block" htmlFor="name">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <Input type="password" {...register('password')} autoComplete="current-password" />
          {errors.password && <p className="text-sm text-red-500">{errors.password?.message}</p>}
        </div>
        {/* Xác nhận mật khẩu */}
        <div className="mt-4">
          <label className="mb-1 block" htmlFor="name">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <Input type="password" {...register('confirmPassword')} autoComplete="current-password" />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>}
        </div>
        {/* Controls */}
        <div className="mt-4">
          <Button className="w-full" type="submit">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
