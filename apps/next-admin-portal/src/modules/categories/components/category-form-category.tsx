import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { CategoryEntity, CategoryFormData } from '@/modules/categories/interfaces/categories.interface';

type CategoryFormCategoryProps = {
  form: UseFormReturn<CategoryFormData>;
  categories: CategoryEntity[];
} & ComponentBaseProps;

export default function CategoryFormCategory({ form, categories }: CategoryFormCategoryProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('category_parent')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="parentId"
            render={({ field, fieldState: { error } }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={value => field.onChange(value === 'root' ? '' : value)}>
                      <SelectTrigger aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="root">Root</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error?.message && <FormMessage message={t(error.message)} />}
                </FormItem>
              );
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
