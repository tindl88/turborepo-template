import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CreateUserDto } from '../interfaces/users.interface';

type UserFormFieldsProps = {
  form: UseFormReturn<CreateUserDto>;
} & ComponentBaseProps;

const UserFormFields: FC<UserFormFieldsProps> = ({ className, form }) => {
  const t = useTranslations();

  return (
    <div className={classNames('grid gap-4', className)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('user_name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {form.formState.errors.name?.message && <FormMessage message={t(form.formState.errors.name.message)} />}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('user_email')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {form.formState.errors.email?.message && <FormMessage message={t(form.formState.errors.email.message)} />}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('user_phone')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {form.formState.errors.phoneNumber?.message && (
              <FormMessage message={t(form.formState.errors.phoneNumber.message)} />
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default UserFormFields;
