import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { ds } from '~react-native-design-system';

import { UpdateProfileDto } from '../interfaces/profile.interface';

import Button from '@/components/core-ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/core-ui/form';
import Input from '@/components/core-ui/input';
import View from '@/components/core-ui/view';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { ProfileParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { UserEntity } from '@/modules/users/interfaces/users.interface';

import log from '@/utils/logger.util';

import ProfileApi from '../api/profile.api';
import { updateProfileValidator } from '../validators/update-profile.validator';

type ProfileFormProps = {
  data: UserEntity;
};

const ProfileForm: FC<ProfileFormProps> = ({ data }) => {
  const { t } = useTranslation();
  const authState = useAuthState();
  const navigation = useNavigation<StackNavigationProp<ProfileParamList>>();

  const mutation = useMutation({
    mutationFn: (formData: UpdateProfileDto) => ProfileApi.updateProfile(formData),
    onSuccess: resp => {
      authState.setAuthData(resp.data.data);
      form.reset(resp.data.data);
      log.extend('PROFILE').info('Update Profile Success');
      navigation.navigate('Profile');
    },
    onError: error => log.extend('PROFILE').error(`Update Profile: ${error}`)
  });

  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(updateProfileValidator),
    defaultValues: {
      name: data.name,
      phoneNumber: data.phoneNumber
    }
  });

  const onSubmit: SubmitHandler<UpdateProfileDto> = async formData => mutation.mutate(formData);

  useEffect(() => {
    form.reset({
      name: data.name,
      phoneNumber: data.phoneNumber
    });
  }, [data]);

  return (
    <Form {...form}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ds.gap10}>
          <FormField
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('profile_name')}</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('profile_phone_number')}</FormLabel>
                <Input {...field} style={fieldState.error && ds.borderRed500} onChangeText={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
      </ScrollView>
      <View style={ds.mt12}>
        <Button loading={mutation.isPending} disabled={mutation.isPending} onPress={form.handleSubmit(onSubmit)}>
          {t('save').toUpperCase()}
        </Button>
      </View>
    </Form>
  );
};

export default ProfileForm;
