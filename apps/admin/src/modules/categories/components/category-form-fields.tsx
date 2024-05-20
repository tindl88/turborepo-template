import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/components/ui/form';
import { Input } from '@ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CreateCategoryDto } from '../interfaces/categories.interface';

type CategoryFormFieldsProps = {
  form: UseFormReturn<CreateCategoryDto>;
} & ComponentBaseProps;

const CategoryFormFields: FC<CategoryFormFieldsProps> = ({ className, form }) => {
  const t = useTranslations();

  return (
    <div className={classNames('grid gap-4', className)}>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('category_title')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryFormFields;
