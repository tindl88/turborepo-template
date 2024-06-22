import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ds } from '~react-native-design-system';

import { SignInDto, SignInResponse } from '../interfaces/auth.interface';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';
import InputPassword from '@/components/core-ui/input-password';
import View from '@/components/core-ui/view';

import log from '@/utils/logger.util';
import { getRefreshTokenFromHeader } from '../utils/session.util';

import AuthApi from '../api/auth.api';
import { useAuthState } from '../states/auth.state';
import { signInValidator } from '../validators/sign-in.validator';

const LoginForm = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const authState = useAuthState();

  const defaultValues: SignInDto = {
    email: 'ammodesk@gmail.com',
    password: 'Ammodesk123@'
  };

  const form = useForm<SignInDto>({ resolver: zodResolver(signInValidator), defaultValues });

  const mutation = useMutation({
    mutationFn: async (signInDto: SignInDto) => AuthApi.passwordSignIn(signInDto),
    onSuccess: resp => {
      const refreshToken = getRefreshTokenFromHeader<SignInResponse>(resp);

      authState.setAuthData(resp.data.data.user);
      authState.setRefreshToken(refreshToken);
      authState.setAccessToken(resp.data.data.accessToken);
      log.extend('AUTH').info('Login Password Success');
    },
    onError: error => {
      toast.show(t('signin_error'), { type: 'danger' });
      log.extend('AUTH').error(`Login Password Failed: ${error}`);
    }
  });

  const onSubmit: SubmitHandler<SignInDto> = async formData => mutation.mutate(formData);

  return (
    <Form {...form}>
      <View style={ds.gap20}>
        <View>
          <FormField
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <Input
                  {...field}
                  style={fieldState.error && ds.borderRed500}
                  placeholder={t('signin_email')}
                  onChangeText={field.onChange}
                />
                {form.formState.errors.email?.message && (
                  <FormMessage message={t(form.formState.errors.email.message, { count: 1, max: 320 })} />
                )}
              </FormItem>
            )}
          />
        </View>
        <View>
          <FormField
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <InputPassword
                  {...field}
                  style={fieldState.error && ds.borderRed500}
                  placeholder={t('signin_password')}
                  onChangeText={field.onChange}
                />
                {form.formState.errors.password?.message && (
                  <FormMessage message={t(form.formState.errors.password.message, { count: 8, max: 255 })} />
                )}
              </FormItem>
            )}
          />
        </View>
        <View>
          <Button disabled={mutation.isPending} onPress={form.handleSubmit(onSubmit)}>
            {t('signin').toUpperCase()}
          </Button>
        </View>
      </View>
    </Form>
  );
};

export default LoginForm;
