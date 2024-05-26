import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ds } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input } from '@/components/core-ui';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/core-ui/form';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { CreateUserDto } from '@/modules/users/interfaces/users.interface';

import { signUpValidator } from '../validators/sign-up.validator';

type FormData = CreateUserDto & {
  confirmPassword?: string;
};

const RegisterForm = () => {
  const { t } = useTranslation();
  const auth = useAuthState();

  const defaultValues = {
    name: 'Tin Tran',
    email: 'tindl88@gmail.com',
    password: 'Tintran123@',
    confirmPassword: 'Tintran123@'
  } as FormData;

  const form = useForm<FormData>({
    resolver: zodResolver(signUpValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      delete data.confirmPassword;
      auth.createAccountRequest(data);
    } catch (error) {}
  };

  return (
    <View>
      <Form {...form}>
        <View>
          <FormField
            name="name"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt14}>
          <FormField
            name="email"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt14}>
          <FormField
            name="password"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt14}>
          <FormField
            name="confirmPassword"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('confirm_password')}</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <View style={ds.mt20}>
          <Button onPress={form.handleSubmit(onSubmit)}>{t('create_account').toUpperCase()}</Button>
        </View>
      </Form>
    </View>
  );
};

export default RegisterForm;
