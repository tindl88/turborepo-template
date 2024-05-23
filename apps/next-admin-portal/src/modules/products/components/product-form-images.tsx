import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '~ui/components/ui/form';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { CreateProductDto } from '../interfaces/products.interface';

import ButtonRemoveFile from '@/components/common/button-remove-file';
import ButtonSelectFile from '@/components/common/button-select-file';

import FileDialog from '@/modules/files/components/file-dialog';

type ProductFormImagesProps = {
  form: UseFormReturn<CreateProductDto>;
} & ComponentBaseProps;

export default function ProductFormImages({ form }: ProductFormImagesProps) {
  const t = useTranslations();
  const [isFileManagerVisible, setIsFileManagerVisible] = useState(false);
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'images'
  });

  const onSortableEnd = (event: SortableEvent) => {
    if (event.oldIndex !== undefined && event.newIndex !== undefined) {
      move(event.oldIndex, event.newIndex);
    }
  };

  return (
    <Card>
      <CardHeader className="justify-between">
        <div className="flex items-center justify-between">
          <CardTitle>{t('post_images')}</CardTitle>
          <ButtonSelectFile onClick={() => setIsFileManagerVisible(true)} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {fields.length > 0 && (
          <ReactSortable
            animation={100}
            className="grid grid-cols-3 gap-2"
            list={fields}
            setList={() => {}}
            onEnd={onSortableEnd}
          >
            {fields.map((image, index) => {
              return (
                <div key={image.id}>
                  <FormField
                    control={form.control}
                    name={`images.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input readOnly {...field} className="hidden" />
                        </FormControl>
                        <div className="relative overflow-hidden rounded-md">
                          <Image
                            className="aspect-square w-full object-cover"
                            src={process.env.NEXT_PUBLIC_API_URL + '/' + image.uniqueName}
                            alt={image.id}
                            height="112"
                            width="112"
                          />
                          <ButtonRemoveFile onClick={() => remove(index)} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </ReactSortable>
        )}
        {fields.length === 0 && (
          <div className="grid grid-cols-3 gap-2">
            <ButtonSelectFile className="aspect-square" onClick={() => setIsFileManagerVisible(true)} />
          </div>
        )}
        <FileDialog
          visible={isFileManagerVisible}
          type={'multiple'}
          selectedItems={[]}
          mime="image/"
          onCancel={() => setIsFileManagerVisible(false)}
          onSelectClick={items => {
            for (let i = 0; i < items.length; i++) {
              const item = items[i];

              if (item) append(item);
            }

            setIsFileManagerVisible(false);
          }}
        />
      </CardContent>
    </Card>
  );
}
