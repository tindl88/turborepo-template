import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input } from '@/components/core-ui';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';

import { useAuthState } from '@/modules/auth/states/auth.state';

import { signInValidator } from '../validators/sign-in.validator';

interface IFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuthState();

  const defaultValues = {
    email: 'ammodesk@gmail.com',
    password: 'Ammodesk123@'
  } as IFormData;

  const form = useForm<IFormData>({
    resolver: zodResolver(signInValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    try {
      auth.loginRequest({ provider: 'password', credentials: data });
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
