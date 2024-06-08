import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignInCredential } from '../interfaces/auth.interface';

import { SIGN_IN_AUTHENTICATOR, SIGN_IN_PROVIDER } from '../constants/auth.constant';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';

import { useAuthState } from '@/modules/auth/states/auth.state';

import { signInValidator } from '../validators/sign-in.validator';

const LoginForm = () => {
  const { t } = useTranslation();
  const authState = useAuthState();

  const defaultValues = {
    email: 'ammodesk@gmail.com',
    password: 'Ammodesk123@'
  } as SignInCredential;

  const form = useForm<SignInCredential>({
    resolver: zodResolver(signInValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<SignInCredential> = async formData => {
    try {
      authState.loginRequest({
        provider: SIGN_IN_PROVIDER.PASSWORD,
        authenticator: SIGN_IN_AUTHENTICATOR.SELF_HOSTED,
        credentials: formData
      });
    } catch (error) {}
  };

  return (
    <View>
      <Form {...form}>
        <View>
          <FormField
            name="email"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <Input
                  {...field}
                  style={fieldState.error && ds.borderRed500}
                  placeholder="Email"
                  onChangeText={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt20}>
          <FormField
            name="password"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <Input
                  {...field}
                  style={fieldState.error && ds.borderRed500}
                  placeholder="Password"
                  onChangeText={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt20}>
          <Button onPress={form.handleSubmit(onSubmit)}>{t('login').toUpperCase()}</Button>
        </View>
      </Form>
    </View>
  );
};

export default LoginForm;
