import React, { FC, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CategoryFormData } from '../interfaces/categories.interface';

import { toSlug } from '~shared-universal/utils/string.util';

type CategoryFormFieldsProps = {
  form: UseFormReturn<CategoryFormData>;
  isEdit: boolean;
} & ComponentBaseProps;

const CategoryFormFields: FC<CategoryFormFieldsProps> = ({ className, form }) => {
  const t = useTranslations();

  const nameValue = form.watch('name');

  useEffect(() => {
    form.setValue('slug', toSlug(nameValue));
  }, [nameValue]);

  return (
    <div className={classNames('grid gap-4', className)}>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('category_title')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 255 })} />}
          </FormItem>
        )}
      />
      {/* Slug */}
      <FormField
        control={form.control}
        name="slug"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('post_slug')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 255 })} />}
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryFormFields;
