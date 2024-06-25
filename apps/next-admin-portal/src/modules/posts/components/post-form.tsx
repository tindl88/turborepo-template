import { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~ui/components/ui/card';
import { Form } from '~ui/components/ui/form';

import { useRouter } from '@/navigation';

import { PostEntity, PostFormData } from '../interfaces/posts.interface';

import { POST_STATUS, POST_STATUSES } from '../constants/posts.constant';

import FormToolbar from '@/components/common/form-toolbar';

import { CategoryEntity } from '@/modules/categories/interfaces/categories.interface';
import { FileEntity } from '@/modules/files/interfaces/files.interface';

import { usePostsState } from '../states/posts.state';
import { postFormValidator } from '../validators/post-form.validator';

import PostFormCategory from './post-form-category';
import PostFormCover from './post-form-cover';
import PostFormFields from './post-form-fields';
import PostFormImages from './post-form-images';
import PostFormStatus from './post-form-status';

type PostFormProps = {
  categories: CategoryEntity[];
  data?: PostEntity;
};

const PostForm: FC<PostFormProps> = ({ data, categories }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const postsState = usePostsState();

  const defaultValues: PostFormData = {
    status: data?.status ?? POST_STATUS.DRAFT,
    name: data?.name ?? '',
    slug: data?.slug ?? '',
    cover: data?.cover ?? '',
    images: data?.images ?? ([] as FileEntity[]),
    description: data?.description ?? '',
    body: data?.body ?? '',
    categoryId: data?.category?.id ?? ''
  };

  const form = useForm<PostFormData>({ resolver: zodResolver(postFormValidator), defaultValues });

  const onSubmit: SubmitHandler<PostFormData> = async formData => {
    formData.images = formData.images.map(item => ({ id: item.id }) as FileEntity);

    if (data) {
      postsState.updateRequest({ id: data.id, data: formData });
    } else {
      postsState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  return (
    <div data-testid="frm-post">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            className="mb-4"
            title={t('post_details')}
            onBackClick={() =>
              router.push({
                pathname: '/posts',
                query: { sidebar: searchParams.get('sidebar') }
              })
            }
          />
          <div className="flex gap-4">
            <Card className="grow">
              <CardContent className="grid gap-4 pt-4">
                <PostFormFields form={form} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <PostFormStatus form={form} statuses={POST_STATUSES} />
                <PostFormCategory form={form} categories={categories} />
                <PostFormCover form={form} />
                <PostFormImages form={form} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
