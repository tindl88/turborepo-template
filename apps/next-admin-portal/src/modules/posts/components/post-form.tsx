import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~react-web-ui-shadcn/components/ui/card';
import { Form } from '~react-web-ui-shadcn/components/ui/form';

import { useRouter } from '@/navigation';

import { PostFormData } from '../interfaces/posts.interface';

import { POST_STATUS, POST_STATUSES } from '../constants/posts.constant';

import usePosts from '../hooks/use-posts';

import FormToolbar from '@/components/form-toolbar';
import ModalLoading from '@/components/modals/modal-loading';

import { FileEntity } from '@/modules/files/interfaces/files.interface';

import { usePostsState } from '../states/posts.state';
import { postFormValidator } from '../validators/post-form.validator';

import PostFormCategory from './post-form-category';
import PostFormCover from './post-form-cover';
import PostFormFields from './post-form-fields';
import PostFormImages from './post-form-images';
import PostFormStatus from './post-form-status';

type PostFormProps = {
  isEdit: boolean;
};

const PostForm: FC<PostFormProps> = ({ isEdit }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const postsState = usePostsState();
  const { post, categories, isFetching } = usePosts({ isEdit, postId: params.id as string });

  const defaultValues: PostFormData = {
    status: post?.status ?? POST_STATUS.DRAFT,
    name: post?.name ?? '',
    slug: post?.slug ?? '',
    cover: post?.cover ?? '',
    images: post?.images ?? ([] as FileEntity[]),
    description: post?.description ?? '',
    body: post?.body ?? '',
    categoryId: post?.category?.id ?? ''
  };

  const form = useForm<PostFormData>({ resolver: zodResolver(postFormValidator), defaultValues });

  const onSubmit: SubmitHandler<PostFormData> = async formData => {
    formData.images = formData.images.map(item => ({ id: item.id }) as FileEntity);

    if (isEdit) {
      postsState.updateRequest({ id: params.id as string, data: formData });
    } else {
      postsState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [post]);

  return (
    <div data-testid="frm-post">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            className="mb-4"
            title={t('post_details')}
            submitDisabled={isFetching}
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
                <PostFormFields form={form} isEdit={isEdit} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <PostFormStatus form={form} isEdit={isEdit} statuses={POST_STATUSES} />
                <PostFormCategory form={form} isEdit={isEdit} categories={categories ?? []} />
                <PostFormCover form={form} isEdit={isEdit} />
                <PostFormImages form={form} isEdit={isEdit} />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <ModalLoading visible={isFetching} />
    </div>
  );
};

export default PostForm;
