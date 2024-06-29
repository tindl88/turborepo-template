import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~react-web-ui-shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~react-web-ui-shadcn/components/ui/form';
import { Input } from '~react-web-ui-shadcn/components/ui/input';

import { SignInDto } from '../interfaces/auth.interface';

import Logo from '@/components/icons/logo';

import { useAuthState } from '@/modules/auth/states/auth.state';

import { signInValidator } from '../validators/sign-in.validator';

import FacebookSignInButton from './facebook-signin';
import GoogleSignInButton from './google-signin';

const LoginForm = () => {
  const t = useTranslations();
  const authState = useAuthState();

  const defaultValues: SignInDto = {
    email: 'ammodesk@gmail.com',
    password: 'Ammodesk123@'
  };

  const form = useForm<SignInDto>({ resolver: zodResolver(signInValidator), defaultValues });

  const onSubmit: SubmitHandler<SignInDto> = async formData => {
    authState.signIn({ ...formData, redirect: true, callbackUrl: '/' });
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
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                {error?.message && <FormMessage message={t(error.message, { min: 1, max: 320 })} />}
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="mt-3">
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {error?.message && <FormMessage message={t(error.message, { min: 8, max: 255 })} />}
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
            <GoogleSignInButton />
            <FacebookSignInButton />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
