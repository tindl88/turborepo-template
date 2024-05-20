import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@ui/components/ui/card';
import { Form } from '@ui/components/ui/form';

import { useRouter } from '@/navigation';

import { CategoryEntity, CreateCategoryDto } from '../interfaces/categories.interface';

import { CATEGORY_STATUS } from '../constants/categories.constant';

import FormToolbar from '@/components/common/form-toolbar';

import { useCategoriesState } from '../states/categories.state';
import { categoryFormValidator } from '../validators/category-form.validator';

import CategoryFormFields from './category-form-fields';
import CategoryFormStatus from './category-form-status';

type CategoryFormProps = {
  data?: CategoryEntity;
};

const CategoryForm: FC<CategoryFormProps> = ({ data }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesState = useCategoriesState();

  const isEditMode = !!data;

  const form = useForm<CreateCategoryDto>({
    resolver: zodResolver(categoryFormValidator),
    defaultValues: {
      status: data?.status ?? CATEGORY_STATUS.VISIBLED,
      name: data?.name ?? ''
    }
  });

  const onSubmit: SubmitHandler<CreateCategoryDto> = async formData => {
    if (isEditMode) {
      categoriesState.updateRequest({ id: data.id, data: formData });
    } else {
      categoriesState.createRequest(formData);
    }
  };

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
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <CategoryFormStatus form={form} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
