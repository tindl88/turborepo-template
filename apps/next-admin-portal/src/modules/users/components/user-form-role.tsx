import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { CheckCircleIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Label } from '~ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~ui/components/ui/radio-group';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CreateUserDto } from '../interfaces/users.interface';

type UserFormRoleProps = {
  form: UseFormReturn<CreateUserDto>;
} & ComponentBaseProps;

const roleOptions = [
  { value: 'user', label: 'user_role_user' },
  { value: 'admin', label: 'user_role_admin' },
  { value: 'super_admin', label: 'user_role_super_admin' }
];

const UserFormRole: FC<UserFormRoleProps> = ({ className, form }) => {
  const t = useTranslations();

  return (
    <div className={classNames('grid gap-4', className)}>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('user_role')}</FormLabel>
            <FormControl>
              <RadioGroup defaultValue={field.value} className="flex" onValueChange={field.onChange}>
                {roleOptions.map(option => (
                  <FormItem key={option.value}>
                    <FormControl>
                      <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                    </FormControl>
                    <Label
                      htmlFor={option.value}
                      className="flex cursor-pointer flex-col rounded-md border-2 border-muted bg-background px-4 py-2 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex w-32 items-center justify-center space-x-2">
                        <div className="grow">
                          <strong>{t(option.label)}</strong>
                        </div>
                        <CheckCircleIcon
                          size={14}
                          className={classNames('text-primary', option.value !== field.value && 'hidden')}
                          aria-hidden="true"
                        />
                      </div>
                    </Label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage message={t(form.formState.errors.role?.message)} />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UserFormRole;
