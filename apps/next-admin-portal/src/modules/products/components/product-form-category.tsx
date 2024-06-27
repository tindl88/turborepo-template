import { Fragment, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { ProductFormData } from '../interfaces/products.interface';

import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';

import { repeatStr } from '~shared-universal/utils/string.util';

const renderCategories = (cates: CategoryEntity[], depth = 0) => {
  return cates.map(category => (
    <Fragment key={category.id}>
      <SelectItem value={category.id}>
        {repeatStr('└', '─', depth)}
        {category.name}
      </SelectItem>
      {category.children && renderCategories(category.children, depth + 1)}
    </Fragment>
  ));
};

type ProductFormCategoryProps = {
  form: UseFormReturn<ProductFormData>;
  isEdit: boolean;
  categories: CategoryEntity[];
  onChange?: (value: string) => void;
} & ComponentBaseProps;

export default function ProductFormCategory({ form, categories, onChange }: ProductFormCategoryProps) {
  const t = useTranslations();
  const memoizedCategories = useMemo(() => renderCategories(categories), [categories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={value => {
                      const val = value === 'root' ? '' : value;

                      field.onChange(val);
                      onChange?.(val);
                    }}
                  >
                    <SelectTrigger aria-label={t('category_select_category')}>
                      <SelectValue placeholder={t('category_select_category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="root">Root</SelectItem>
                      {memoizedCategories}
                    </SelectContent>
                  </Select>
                </FormControl>
                {error?.message && <FormMessage message={t(error.message)} />}
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
