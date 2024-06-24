import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { ds } from '~react-native-design-system';

import { ResetPasswordDto } from '../interfaces/auth.interface';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import InputPassword from '@/components/core-ui/input-password';
import View from '@/components/core-ui/view';
import { hideGlobalModal, showGlobalModal } from '@/components/global-modal/global-modal';
import ModalSuccess from '@/components/modal-success';

import { UnauthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';

import log from '@/utils/logger.util';

import { resetPasswordValidator } from '../validators/reset-password.validator';

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<UnauthenticatedNavigationProps>();

  const defaultValues: ResetPasswordDto = {
    otpCode: '12345',
    password: 'Ammodesk123@',
    confirmPassword: 'Ammodesk123@'
  };

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<ResetPasswordDto> = async _data => {
    showGlobalModal({
      modalKey: 'modal-success',
      hideClose: true,
      component: <ModalSuccess redirectTo={() => navigation.navigate('Login')} />
    });
    try {
    } catch (error) {
      log.extend('AUTH').error('Forgot Password Failed', error);
    }
  };

  useEffect(() => {
    return hideGlobalModal('modal-success');
  }, []);

  return (
    <Form {...form}>
      <View style={ds.gap20}>
        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <InputPassword {...field} error={!!error} placeholder={t('password')} onChangeText={field.onChange} />
              {error?.message && <FormMessage message={t(error.message, { count: 8, max: 255 })} />}
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <InputPassword
                {...field}
                error={!!error}
                placeholder={t('confirm_password')}
                onChangeText={field.onChange}
              />
              {error?.message && <FormMessage message={t(error.message, { count: 8, max: 255 })} />}
            </FormItem>
          )}
        />
      </View>
      <View style={ds.mt32}>
        <Button onPress={form.handleSubmit(onSubmit)}>{t('reset_password_btn')}</Button>
      </View>
    </Form>
  );
};

export default ResetPasswordForm;
