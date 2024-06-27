import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~ui/components/ui/card';
import { Form } from '~ui/components/ui/form';

import { useRouter } from '@/navigation';

import { CategoryFormData } from '../interfaces/categories.interface';

import { CATEGORY_STATUS, CATEGORY_STATUSES, CATEGORY_TYPE, CATEGORY_TYPES } from '../constants/categories.constant';

import useCategories from '../hooks/use-categories';

import FormToolbar from '@/components/form-toolbar';
import ModalLoading from '@/components/modals/modal-loading';

import { useCategoriesState } from '../states/categories.state';
import { categoryFormValidator } from '../validators/category-form.validator';

import CategoryFormCategory from './category-form-category';
import CategoryFormFields from './category-form-fields';
import CategoryFormStatus from './category-form-status';
import CategoryFormType from './category-form-type';

type CategoryFormProps = {
  isEdit: boolean;
};

const CategoryForm: FC<CategoryFormProps> = ({ isEdit }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const categoriesState = useCategoriesState();
  const { category, categories, isFetching, refetchCategories } = useCategories({
    isEdit,
    categoryId: params.id as string
  });

  const defaultValues: CategoryFormData = {
    status: category?.status ?? CATEGORY_STATUS.VISIBLED,
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    type: category?.type ?? ('' as CATEGORY_TYPE),
    parentId: category?.category?.id ?? ''
  };

  const form = useForm<CategoryFormData>({ resolver: zodResolver(categoryFormValidator), defaultValues });

  const onSubmit: SubmitHandler<CategoryFormData> = async formData => {
    if (isEdit) {
      categoriesState.updateRequest({ id: params.id as string, data: formData });
    } else {
      categoriesState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [category]);

  return (
    <div data-testid="frm-category">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            className="mb-4"
            title={t('category_details')}
            submitDisabled={isFetching}
            onBackClick={() =>
              router.push({ pathname: '/categories', query: { sidebar: searchParams.get('sidebar') } })
            }
          />
          <div className="flex gap-4">
            <Card className="grow">
              <CardContent className="grid gap-4 pt-4">
                <CategoryFormFields form={form} isEdit={isEdit} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <CategoryFormStatus form={form} isEdit={isEdit} statuses={CATEGORY_STATUSES} />
                {!category && (
                  <CategoryFormType
                    form={form}
                    isEdit={isEdit}
                    types={CATEGORY_TYPES}
                    onChange={value => refetchCategories({ type: value as CATEGORY_TYPE })}
                  />
                )}
                <CategoryFormCategory form={form} isEdit={isEdit} categories={categories ?? []} />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <ModalLoading visible={isFetching} />
    </div>
  );
};

export default CategoryForm;
