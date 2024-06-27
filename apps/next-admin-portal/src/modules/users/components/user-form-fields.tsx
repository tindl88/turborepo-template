import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~react-web-ui-shadcn/components/ui/form';
import { Input } from '~react-web-ui-shadcn/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { UserFormData } from '../interfaces/users.interface';

type UserFormFieldsProps = {
  form: UseFormReturn<UserFormData>;
  isEdit: boolean;
} & ComponentBaseProps;

const UserFormFields: FC<UserFormFieldsProps> = ({ className, form }) => {
  const t = useTranslations();

  return (
    <div className={classNames('grid gap-4', className)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('user_name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 50 })} />}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('user_email')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 320 })} />}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('user_phone')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message)} />}
          </FormItem>
        )}
      />
    </div>
  );
};

export default UserFormFields;
