import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ds } from '@/design-system';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { UpdateProfileDto } from '../interfaces/profile.interface';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';
import View from '@/components/core-ui/view';

import { AuthEntity } from '@/modules/auth/interfaces/auth.interface';
import { useAuthState } from '@/modules/auth/states/auth.state';

import log from '@/utils/logger.util';

import ProfileApi from '../api/profile.api';
import { updateProfileValidator } from '../validators/update-profile.validator';

type ProfileFormProps = {
  data?: AuthEntity;
};

const ProfileForm: FC<ProfileFormProps> = ({ data }) => {
  const { t } = useTranslation();
  const authState = useAuthState();

  const defaultValues = {
    name: data?.user.name
  } as UpdateProfileDto;

  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(updateProfileValidator),
    defaultValues
  });
  const mutation = useMutation({
    mutationFn: (formData: UpdateProfileDto) => ProfileApi.updateProfile(formData),
    onSuccess: resp => authState.updateAuthData(resp.data.data),
    onError: error => log.extend('PROFILE').error(`Submit Form: ${error}`)
  });

  const onSubmit: SubmitHandler<UpdateProfileDto> = async formData => {
    mutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <View>
        <FormField
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <FormItem>
              <Input
                {...field}
                style={fieldState.error && ds.borderRed500}
                placeholder="Name"
                onChangeText={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </View>
      <View style={ds.mt20}>
        <Button onPress={form.handleSubmit(onSubmit)}>{t('update').toUpperCase()}</Button>
      </View>
    </Form>
  );
};

export default ProfileForm;
