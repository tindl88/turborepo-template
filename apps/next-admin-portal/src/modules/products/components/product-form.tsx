import { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~ui/components/ui/card';
import { Form } from '~ui/components/ui/form';

import { useRouter } from '@/navigation';

import { ProductEntity, ProductFormData } from '../interfaces/products.interface';

import { PRODUCT_STATUS, PRODUCT_STATUSES } from '../constants/products.constant';

import FormToolbar from '@/components/common/form-toolbar';

import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';
import { FileEntity } from '@/modules/files/interfaces/files.interface';

import { useProductsState } from '../states/products.state';
import { productFormValidator } from '../validators/product-form.validator';

import ProductFormCategory from './product-form-category';
import ProductFormCover from './product-form-cover';
import ProductFormFields from './product-form-fields';
import ProductFormImages from './product-form-images';
import ProductFormStatus from './product-form-status';

type ProductFormProps = {
  categories: CategoryEntity[];
  data?: ProductEntity;
};

const ProductForm: FC<ProductFormProps> = ({ data, categories }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productsState = useProductsState();

  const defaultValues: ProductFormData = {
    status: data?.status ?? PRODUCT_STATUS.DRAFT,
    name: data?.name ?? '',
    slug: data?.slug ?? '',
    cover: data?.cover ?? '',
    images: data?.images ?? ([] as FileEntity[]),
    body: data?.body ?? '',
    categoryId: data?.category?.id ?? ''
  };

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<ProductFormData> = async formData => {
    formData.images = formData.images.map(item => ({ id: item.id }) as FileEntity);

    if (data) {
      productsState.updateRequest({ id: data.id, data: formData });
    } else {
      productsState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  return (
    <div data-testid="frm-product">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            className="mb-4"
            title={t('product_details')}
            onBackClick={() =>
              router.push({
                pathname: '/products',
                query: { sidebar: searchParams.get('sidebar') }
              })
            }
          />
          <div className="flex gap-4">
            <Card className="grow">
              <CardContent className="grid gap-4 pt-4">
                <ProductFormFields form={form} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <ProductFormStatus form={form} statuses={PRODUCT_STATUSES} />
                <ProductFormCategory form={form} categories={categories} />
                <ProductFormCover form={form} />
                <ProductFormImages form={form} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
