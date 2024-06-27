import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';
import { CategoryFormData } from '../interfaces/categories.interface';

type CategoryFormTypeProps = {
  form: UseFormReturn<CategoryFormData>;
  isEdit: boolean;
  types: StatusType[];
  onChange?: (value: string) => void;
} & ComponentBaseProps;

export default function CategoryFormType({ form, isEdit, types, onChange }: CategoryFormTypeProps) {
  const t = useTranslations();

  if (isEdit) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('category_type')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={value => {
                      field.onChange(value);
                      onChange?.(value);
                    }}
                  >
                    <SelectTrigger id="type" aria-label={t('category_select_type')}>
                      <SelectValue placeholder={t('category_select_type')} />
                    </SelectTrigger>
                    <SelectContent>
                      {types?.map(type => {
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.icon && <type.icon className={classNames('mr-2 h-4 w-4', type.iconClassName)} />}
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
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
