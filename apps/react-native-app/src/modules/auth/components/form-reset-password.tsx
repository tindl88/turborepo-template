import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';
import View from '@/components/core-ui/view';

import log from '@/utils/logger.util';

import { resetPasswordValidator } from '../validators/reset-password.validator';

interface IFormData {
  email: string;
}

const ResetPasswordForm = () => {
  const { t } = useTranslation();

  const defaultValues = {
    email: 'ammodesk@gmail.com'
  } as IFormData;

  const form = useForm<IFormData>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    log.info(data);
    try {
    } catch (error) {}
  };

  return (
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
      <View style={ds.mt32}>
        <Button onPress={form.handleSubmit(onSubmit)}>{t('forgot_password_btn').toUpperCase()}</Button>
      </View>
    </Form>
  );
};

export default ResetPasswordForm;
