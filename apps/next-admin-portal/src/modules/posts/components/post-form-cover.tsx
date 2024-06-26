import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '~react-web-ui-shadcn/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~react-web-ui-shadcn/components/ui/form';
import { Input } from '~react-web-ui-shadcn/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostFormData } from '../interfaces/posts.interface';

import ButtonRemoveFile from '@/components/button-remove-file';
import ButtonSelectFile from '@/components/button-select-file';

import FileDialog from '@/modules/files/components/file-dialog';

type PostFormCoverProps = {
  form: UseFormReturn<PostFormData>;
  isEdit: boolean;
} & ComponentBaseProps;

export default function PostFormCover({ form }: PostFormCoverProps) {
  const t = useTranslations();
  const [isFileManagerVisible, setIsFileManagerVisible] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('post_cover')}</CardTitle>
          <ButtonSelectFile onClick={() => setIsFileManagerVisible(true)} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <FormField
          control={form.control}
          name={'cover'}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input readOnly {...field} className="hidden" />
                </FormControl>
                {field.value && (
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      className="aspect-video w-full object-cover"
                      src={process.env.NEXT_PUBLIC_API_URL + '/thumbnails/' + field.value}
                      alt={field.value}
                      height="100"
                      width="100"
                    />
                    <ButtonRemoveFile onClick={() => form.setValue('cover', '')} />
                  </div>
                )}
                {error?.message && <FormMessage message={t(error.message)} />}
              </FormItem>
              {!field.value && (
                <ButtonSelectFile className="w-full py-12" onClick={() => setIsFileManagerVisible(true)} />
              )}
            </>
          )}
        />
        <FileDialog
          visible={isFileManagerVisible}
          type={'single'}
          mime="image/"
          selectedItems={[]}
          onCancel={() => setIsFileManagerVisible(false)}
          onSelectClick={files => {
            if (files.length > 0 && files[0]) {
              form.setValue('cover', files[0].uniqueName);
              setIsFileManagerVisible(false);
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
