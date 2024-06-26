import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '~react-web-ui-shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~react-web-ui-shadcn/components/ui/form';
import { Input } from '~react-web-ui-shadcn/components/ui/input';
import { Loading } from '~react-web-ui-shadcn/components/ui/loading';
import { Textarea } from '~react-web-ui-shadcn/components/ui/textarea';
import { useToast } from '~react-web-ui-shadcn/components/ui/use-toast';

import { SendNotificationDto } from '../interfaces/notifications.interface';

import NotificationApi from '../api/notifications.api';
import { sendPushNotificationValidator } from '../validators/send-push-notification.validator';

const PushNotificationPlayGround = () => {
  const t = useTranslations();
  const { toast } = useToast();

  const defaultValues = {
    title: '',
    content: ''
  } as SendNotificationDto;

  const form = useForm<SendNotificationDto>({
    resolver: zodResolver(sendPushNotificationValidator),
    defaultValues
  });

  const mutation = useMutation({
    mutationFn: (formData: SendNotificationDto) => NotificationApi.send(formData),
    onSuccess: () => {
      toast({
        title: t('push_notification_toast_title'),
        description: t('push_notification_send_success')
      });
    },
    onError: error => {
      toast({
        title: t('push_notification_toast_title'),
        description: t('push_notification_send_failure') + '<br />' + error.message
      });
    }
  });

  const onSubmit: SubmitHandler<SendNotificationDto> = async formData => mutation.mutate(formData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-400 opacity-30"></div>
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>{t('push_notification_title')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {error?.message && <FormMessage message={t(error.message, { min: 1 })} />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="mt-3">
              <FormLabel>{t('push_notification_content')}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              {error?.message && <FormMessage message={t(error.message, { min: 1 })} />}
            </FormItem>
          )}
        />
        <div className="mt-6">
          <Button type="submit" disabled={mutation.isPending} className="space-x-2">
            {mutation.isPending && <Loading size={'xs'} />}
            <span>{t('push_notification_send_button')}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PushNotificationPlayGround;
