import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~ui/components/ui/card';
import { Form } from '~ui/components/ui/form';

import { useRouter } from '@/navigation';

import { ProductFormData } from '../interfaces/products.interface';

import { PRODUCT_STATUS, PRODUCT_STATUSES } from '../constants/products.constant';

import useProducts from '../hooks/use-products';

import FormToolbar from '@/components/common/form-toolbar';
import ModalLoading from '@/components/common/modal-loading';

import { FileEntity } from '@/modules/files/interfaces/files.interface';

import { useProductsState } from '../states/products.state';
import { productFormValidator } from '../validators/product-form.validator';

import ProductFormCategory from './product-form-category';
import ProductFormCover from './product-form-cover';
import ProductFormFields from './product-form-fields';
import ProductFormImages from './product-form-images';
import ProductFormStatus from './product-form-status';

type ProductFormProps = {
  isEditMode: boolean;
};

const ProductForm: FC<ProductFormProps> = ({ isEditMode }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const productsState = useProductsState();
  const { product, categories, isFetched, isFetching } = useProducts({ productId: params.id as string });

  const defaultValues: ProductFormData = {
    status: product?.status ?? PRODUCT_STATUS.DRAFT,
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    cover: product?.cover ?? '',
    images: product?.images ?? ([] as FileEntity[]),
    body: product?.body ?? '',
    categoryId: product?.category?.id ?? ''
  };

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormValidator),
    defaultValues
  });

  const onSubmit: SubmitHandler<ProductFormData> = async formData => {
    formData.images = formData.images.map(item => ({ id: item.id }) as FileEntity);

    if (isFetched && isEditMode) {
      productsState.updateRequest({ id: params.id as string, data: formData });
    } else {
      productsState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [product]);

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
                <ProductFormFields form={form} isEditMode={isEditMode} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <ProductFormStatus form={form} isEditMode={isEditMode} statuses={PRODUCT_STATUSES} />
                <ProductFormCategory form={form} isEditMode={isEditMode} categories={categories ?? []} />
                <ProductFormCover form={form} isEditMode={isEditMode} />
                <ProductFormImages form={form} isEditMode={isEditMode} />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <ModalLoading visible={isFetching} />
    </div>
  );
};

export default ProductForm;
