import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';
import { CategoryFormData } from '../interfaces/categories.interface';

type CategoryFormTypeProps = {
  form: UseFormReturn<CategoryFormData>;
  isEditMode: boolean;
  types: StatusType[];
  onChange?: (value: string) => void;
} & ComponentBaseProps;

export default function CategoryFormType({ form, isEditMode, types, onChange }: CategoryFormTypeProps) {
  const t = useTranslations();

  if (isEditMode) return null;

  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name="type"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('category_type')}</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={value => {
                  field.onChange(value);
                  onChange?.(value);
                }}
              >
                <SelectTrigger id="type" aria-label={t('select_type')}>
                  <SelectValue placeholder={t('select_type')} />
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
  );
}
