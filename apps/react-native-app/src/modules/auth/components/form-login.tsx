import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

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
          <Button label={t('login').toUpperCase()} onPress={form.handleSubmit(onSubmit)} />
        </View>
      </Form>
    </View>
  );
};

export default LoginForm;
