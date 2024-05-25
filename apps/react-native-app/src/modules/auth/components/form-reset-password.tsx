import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';

import {useAuthState} from '@/modules/auth/states/auth.state';

import {Input} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';
import {Button} from '@/components/ui/button';
import {Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';

import {resetPasswordValidator} from '../validators/reset-password.validator';

interface IFormData {
  email: string;
}

const ResetPasswordForm = () => {
  const {t} = useTranslation();
  const auth = useAuthState();

  const defaultValues = {
    email: 'ammodesk@gmail.com'
  } as IFormData;

  const form = useForm<IFormData>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    try {
      auth.resetPasswordRequest(data);
    } catch (error) {}
  };

  return (
    <View>
      <Form {...form}>
        <View>
          <FormField
            name="email"
            control={form.control}
            rules={{required: true}}
            render={({field, fieldState}) => (
              <FormItem>
                <FormLabel>{t('email_address')}</FormLabel>
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
          <Button label={t('forgot_password_btn').toUpperCase()} onPress={form.handleSubmit(onSubmit)} />
        </View>
      </Form>
    </View>
  );
};

export default ResetPasswordForm;
