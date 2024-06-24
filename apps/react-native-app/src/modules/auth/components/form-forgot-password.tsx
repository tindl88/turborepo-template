import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { ds } from '~react-native-design-system';

import { ForgotPasswordDto } from '../interfaces/auth.interface';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';
import View from '@/components/core-ui/view';

import { UnauthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';

import log from '@/utils/logger.util';

import { forgotPasswordValidator } from '../validators/forgot-password.validator';

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<UnauthenticatedNavigationProps>();

  const defaultValues: ForgotPasswordDto = {
    email: 'ammodesk@gmail.com'
  };

  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<ForgotPasswordDto> = async _data => {
    navigation.navigate('VerifyOtp');
    try {
    } catch (error) {
      log.extend('AUTH').error('Forgot Password Failed', error);
    }
  };

  return (
    <Form {...form}>
      <View>
        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <Input {...field} error={!!error} placeholder="Email" onChangeText={field.onChange} />
              {error?.message && <FormMessage message={t(error.message, { count: 1, max: 320 })} />}
            </FormItem>
          )}
        />
      </View>
      <View style={ds.mt32}>
        <Button onPress={form.handleSubmit(onSubmit)}>{t('forgot_password_btn')}</Button>
      </View>
    </Form>
  );
};

export default ForgotPasswordForm;
