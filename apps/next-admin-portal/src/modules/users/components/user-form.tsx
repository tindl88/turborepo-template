import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '~react-web-ui-shadcn/components/ui/card';
import { Form } from '~react-web-ui-shadcn/components/ui/form';

import { useRouter } from '@/navigation';

import { UserFormData } from '../interfaces/users.interface';

import { USER_ROLE, USER_STATUS, USER_STATUSES } from '../constants/users.constant';

import useUsers from '../hooks/use-users';

import FormToolbar from '@/components/form-toolbar';
import ModalLoading from '@/components/modals/modal-loading';

import { useUsersState } from '../states/users.state';
import { userFormValidator } from '../validators/user-form.validator';

import UserFormFields from './user-form-fields';
import UserFormRole from './user-form-role';
import UserFormStatus from './user-form-status';

type UserFormProps = {
  isEdit: boolean;
};

const UserForm: FC<UserFormProps> = ({ isEdit }) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const usersState = useUsersState();
  const { user, isFetching } = useUsers({ isEdit, userId: params.id as string });

  const defaultValues: UserFormData = {
    status: user?.status ?? USER_STATUS.INACTIVE,
    name: user?.name ?? '',
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    role: user?.role ?? USER_ROLE.ADMIN
  };

  const form = useForm<UserFormData>({ resolver: zodResolver(userFormValidator), defaultValues });

  const onSubmit: SubmitHandler<UserFormData> = async formData => {
    if (isEdit) {
      usersState.updateRequest({ id: params.id as string, data: formData });
    } else {
      usersState.createRequest(formData);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [user]);

  return (
    <div data-testid="frm-user">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            title={t('user_details')}
            className="mb-4"
            submitDisabled={isFetching}
            onBackClick={() =>
              router.push({
                pathname: '/users',
                query: { sidebar: searchParams.get('sidebar') }
              })
            }
          />
          <div className="flex gap-4">
            <Card className="grow">
              <CardContent className="grid gap-4 pt-4">
                <UserFormFields form={form} isEdit={isEdit} />
                <UserFormRole form={form} isEdit={isEdit} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <UserFormStatus form={form} isEdit={isEdit} statuses={USER_STATUSES} />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <ModalLoading visible={isFetching} />
    </div>
  );
};

export default UserForm;
