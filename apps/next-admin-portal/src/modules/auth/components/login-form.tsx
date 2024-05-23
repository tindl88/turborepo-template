'use client';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';

import { LoginDto } from '../interfaces/auth.interface';

import { AUTH_PROVIDER } from '../constants/auth.constant';

import Logo from '@/components/icons/logo';

import { useAuthState } from '@/modules/auth/states/auth.state';

import { signInValidator } from '../validators/sign-in.validator';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const t = useTranslations();
  const authState = useAuthState();

  const defaultValues = {
    email: 'ammodesk@gmail.com',
    password: 'Ammodesk123@'
  } as LoginFormValues;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(signInValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async formData => {
    authState.signIn({
      ...(formData as LoginDto),
      provider: AUTH_PROVIDER.CREDENTIALS,
      redirect: true,
      callbackUrl: '/'
    });
  };

  return (
    <div className="flex h-full grow items-center justify-center" data-testid="frm-login">
      <Form {...form}>
        <form
          className="relative w-full max-w-sm self-center overflow-hidden rounded-xl p-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-400 opacity-30"></div>
          {/* Logo */}
          <div className="flex justify-center">
            <Logo width={60} />
          </div>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit */}
          <div className="mt-6">
            <Button className="w-full" type="submit">
              {t('login')}
            </Button>
          </div>
          {/* OAuth */}
          <div className="flex items-center justify-center space-x-3">
            {/* <GoogleSignInButton /> */}
            {/* <FacebookSignInButton /> */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
