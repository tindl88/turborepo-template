import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/components/ui/select';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';
import { PostFormData } from '../interfaces/posts.interface';

type PostFormStatusProps = {
  form: UseFormReturn<PostFormData>;
  statuses: StatusType[];
} & ComponentBaseProps;

export default function PostFormStatus({ form, statuses }: PostFormStatusProps) {
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
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" aria-label={t('select_status')}>
                      <SelectValue placeholder={t('select_status')} />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses?.map(status => {
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
                {error?.message && <FormMessage message={t(error.message, { min: 1 })} />}
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
