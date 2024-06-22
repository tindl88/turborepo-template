import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CreateUserDto } from '../interfaces/users.interface';

import { USER_STATUSES } from '../constants/users.constant';

type UserFormStatusProps = {
  form: UseFormReturn<CreateUserDto>;
} & ComponentBaseProps;

export default function UserFormStatus({ form }: UserFormStatusProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('status')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" aria-label={t('select_status')}>
                      <SelectValue placeholder={t('select_status')} />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_STATUSES.map(status => {
                        return (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center">
                              {status.icon && (
                                <status.icon className={classNames('mr-2 h-4 w-4', status.iconClassName)} />
                              )}
                              <span>{status.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.status?.message && (
                  <FormMessage message={t(form.formState.errors.status.message)} />
                )}
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
