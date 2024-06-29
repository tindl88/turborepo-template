import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { HttpStatusCode } from 'axios';
import { merge } from 'lodash-es';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~react-web-ui-shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~react-web-ui-shadcn/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~react-web-ui-shadcn/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~react-web-ui-shadcn/components/ui/select';

import { useRouter } from '@/navigation';

import SettingApi from '../../api/settings.api';
import { Languages, PreferenceEntity } from '../../interfaces/settings.interface';
import { updateAppearanceValidator } from '../../validators/update-appearance.validator';

type AppearanceFormValues = {
  theme: string;
  language: Languages;
  font: string;
  fontSize: number;
};

export function AppearanceForm() {
  const t = useTranslations();
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preference = session.data?.user?.preference;

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(updateAppearanceValidator),
    defaultValues: {
      theme: preference?.theme,
      language: preference?.language
    }
  });

  const onSubmit: SubmitHandler<AppearanceFormValues> = async formData => {
    const prefs = await SettingApi.updatePreference(formData);

    if (prefs.status === HttpStatusCode.Ok) {
      if (!session.data) return;

      // Update next-auth session
      const newSession = merge({}, session, {
        data: {
          user: {
            preference: {
              theme: formData.theme,
              language: formData.language
            } as PreferenceEntity
          }
        }
      });

      await session.update(newSession.data);

      // Change language
      router.replace(
        {
          pathname: '/settings/[type]',
          params: { type: 'appearance' },
          query: { sidebar: searchParams.get('sidebar') }
        },
        { locale: formData.language as Languages }
      );

      router.refresh();
    }
  };

  useEffect(() => {
    if (preference?.theme && preference?.language && session.status === 'authenticated') {
      form.setValue('theme', preference.theme);
      form.setValue('language', preference.language);
    }
  }, [session.status, preference?.theme, preference?.language]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="language"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>{t('language')}</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-us">United States</SelectItem>
                      <SelectItem value="vi-vn">Vietnamese</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormDescription>{t('sidebar_menu_settings_appearance_language_desc')}</FormDescription>
              {error?.message && <FormMessage message={t(error.message)} />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="space-y-1">
              <FormLabel>{t('theme')}</FormLabel>
              <FormDescription>{t('sidebar_menu_settings_appearance_theme_desc')}</FormDescription>
              {error?.message && <FormMessage message={t(error.message)} />}
              <RadioGroup
                value={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
                onValueChange={field.onChange}
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">{t('theme_light')}</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">{t('theme_dark')}</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit">{t('update')}</Button>
      </form>
    </Form>
  );
}
