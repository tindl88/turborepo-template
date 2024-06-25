import { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~ui/components/ui/card';
import { Form } from '~ui/components/ui/form';

import { useRouter } from '@/navigation';

import { CategoryEntity, CategoryFormData } from '../interfaces/categories.interface';

import { CATEGORY_STATUS, CATEGORY_STATUSES, CATEGORY_TYPE, CATEGORY_TYPES } from '../constants/categories.constant';

import FormToolbar from '@/components/common/form-toolbar';

import { useCategoriesState } from '../states/categories.state';
import { categoryFormValidator } from '../validators/category-form.validator';

import CategoryFormCategory from './category-form-category';
import CategoryFormFields from './category-form-fields';
import CategoryFormStatus from './category-form-status';
import CategoryFormType from './category-form-type';

type CategoryFormProps = {
  categories: CategoryEntity[];
  data?: CategoryEntity;
};

const CategoryForm: FC<CategoryFormProps> = ({ data, categories }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesState = useCategoriesState();

  const defaultValues: CategoryFormData = {
    status: data?.status ?? CATEGORY_STATUS.VISIBLED,
    name: data?.name ?? '',
    slug: data?.slug ?? '',
    type: data?.type ?? CATEGORY_TYPE.POST,
    categoryId: data?.category?.id ?? ''
  };

  const form = useForm<CategoryFormData>({ resolver: zodResolver(categoryFormValidator), defaultValues });

  const onSubmit: SubmitHandler<CategoryFormData> = async formData => {
    if (data) {
      categoriesState.updateRequest({ id: data.id, data: formData });
    } else {
      categoriesState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  return (
    <div data-testid="frm-category">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            className="mb-4"
            title={t('category_details')}
            onBackClick={() =>
              router.push({
                pathname: '/categories',
                query: { sidebar: searchParams.get('sidebar') }
              })
            }
          />
          <div className="flex gap-4">
            <Card className="grow">
              <CardContent className="grid gap-4 pt-4">
                <CategoryFormFields form={form} />
                <CategoryFormType form={form} types={CATEGORY_TYPES} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <CategoryFormStatus form={form} statuses={CATEGORY_STATUSES} />
                <CategoryFormCategory form={form} categories={categories} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
