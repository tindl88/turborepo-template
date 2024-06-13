'use client';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '~ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';
import { Textarea } from '~ui/components/ui/textarea';

import { SendNotificationDto } from '../interfaces/notifications.interface';

import NotificationApi from '../api/notifications.api';
import { sendPushNotificationValidator } from '../validators/send-push-notification.validator';

const PushNotificationPlayGround = () => {
  const t = useTranslations();

  const defaultValues = {
    title: 'ammodesk@gmail.com',
    content: 'Ammodesk123@'
  } as SendNotificationDto;

  const form = useForm<SendNotificationDto>({
    resolver: zodResolver(sendPushNotificationValidator),
    defaultValues
  });

  const mutation = useMutation({
    mutationFn: (formData: SendNotificationDto) => NotificationApi.send(formData)
    // CHANGEME: remove console
    // onSuccess: resp => console.log(resp),
    // onError: error => console.log(error)
  });

  const onSubmit: SubmitHandler<SendNotificationDto> = async formData => {
    mutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        className="relative w-full max-w-sm self-center overflow-hidden rounded-xl p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-400 opacity-30"></div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('push_notification_title')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>{t('push_notification_content')}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6">
          <Button className="w-full" type="submit">
            {t('push_notification_send_button')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PushNotificationPlayGround;
