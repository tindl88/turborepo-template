import React, { FC, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { Editor } from '@ckeditor/ckeditor5-core';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { ProductFormData } from '../interfaces/products.interface';

import FileDialog from '@/modules/files/components/file-dialog';
import {
  VALID_AUDIO_MIME_TYPES,
  VALID_COMPRESS_MIME_TYPES,
  VALID_DOCUMENT_MIME_TYPES,
  VALID_IMAGE_MIME_TYPES,
  VALID_VIDEO_MIME_TYPES
} from '@/modules/files/constants/files.constant';

import { toSlug } from '@/utils/string.util';

const CKEditor = dynamic(() => import('@/components/common/ck-editor'), {
  ssr: false
});

type ProductFormFieldsProps = {
  form: UseFormReturn<ProductFormData>;
  isEdit: boolean;
} & ComponentBaseProps;

const ProductFormFields: FC<ProductFormFieldsProps> = ({ className, form }) => {
  const t = useTranslations();
  const ckEditorRef = useRef<Editor | null>(null);
  const [isFileManagerVisible, setIsFileManagerVisible] = useState(false);

  const nameValue = form.watch('name');

  useEffect(() => {
    form.setValue('slug', toSlug(nameValue));
  }, [nameValue]);

  return (
    <div className={classNames('grid gap-4', className)}>
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('product_title')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 255 })} />}
          </FormItem>
        )}
      />
      {/* Slug */}
      <FormField
        control={form.control}
        name="slug"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('product_slug')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1, max: 255 })} />}
          </FormItem>
        )}
      />
      {/* Body */}
      <FormField
        control={form.control}
        name="body"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{t('product_body')}</FormLabel>
            <FormControl>
              <>
                <CKEditor
                  minHeight={200}
                  value={field.value}
                  onChange={field.onChange}
                  onFocus={(_event, editor) => (ckEditorRef.current = editor)}
                  onShowFileManager={() => setIsFileManagerVisible(true)}
                />
              </>
            </FormControl>
            {error?.message && <FormMessage message={t(error.message, { min: 1 })} />}
          </FormItem>
        )}
      />
      <FileDialog
        visible={isFileManagerVisible}
        type={'multiple'}
        selectedItems={[]}
        onCancel={() => {
          setIsFileManagerVisible(false);
        }}
        onSelectClick={files => {
          const editor = ckEditorRef.current;

          if (editor) {
            editor.model.change(writer => {
              const selection = editor.model.document.selection;
              const imageItems = files.filter(x => VALID_IMAGE_MIME_TYPES.includes(x.mime));
              const fileItems = files.filter(x =>
                [...VALID_DOCUMENT_MIME_TYPES, ...VALID_COMPRESS_MIME_TYPES].includes(x.mime)
              );
              const mediaItems = files.filter(x =>
                [...VALID_AUDIO_MIME_TYPES, ...VALID_VIDEO_MIME_TYPES].includes(x.mime)
              );

              // Insert media
              mediaItems.forEach(media => {
                const fileUrl = process.env.NEXT_PUBLIC_API_URL + '/' + media.uniqueName;
                const embed = writer.createElement('media', { url: fileUrl });
                const endPosition = editor.model.createPositionAt(embed, 'end');

                editor.model.insertContent(embed, selection);

                selection._setFocus(endPosition);
              });

              // Insert files
              fileItems.forEach(file => {
                const fileUrl = process.env.NEXT_PUBLIC_API_URL + '/' + file.uniqueName;
                const link = writer.createText(file.caption + file.ext);

                writer.setAttribute('linkHref', fileUrl, link);
                editor.model.insertContent(link, selection);
              });

              // Insert images
              imageItems.forEach(image => {
                const fileUrl = process.env.NEXT_PUBLIC_API_URL + '/' + image.uniqueName;

                const imageElement = writer.createElement('imageBlock', {
                  src: fileUrl
                });
                const endPosition = editor.model.createPositionAt(imageElement, 'end');

                editor.model.insertContent(imageElement, selection);

                selection._setFocus(endPosition);
              });
            });
          }

          setIsFileManagerVisible(false);
        }}
      />
    </div>
  );
};

export default ProductFormFields;
