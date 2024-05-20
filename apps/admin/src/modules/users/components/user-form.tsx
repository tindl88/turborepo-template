import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@ui/components/ui/card';
import { Form } from '@ui/components/ui/form';

import { useRouter } from '@/navigation';

import { CreateUserDto, UserEntity } from '../interfaces/users.interface';

import { USER_ROLE, USER_STATUS } from '../constants/users.constant';

import FormToolbar from '@/components/common/form-toolbar';

import { useUsersState } from '../states/users.state';
import { userFormValidator } from '../validators/user-form.validator';

import UserFormFields from './user-form-fields';
import UserFormRole from './user-form-role';
import UserFormStatus from './user-form-status';

type UserFormProps = {
  data?: UserEntity;
};

const UserForm: FC<UserFormProps> = ({ data }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const usersState = useUsersState();

  const isEditMode = !!data;

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(userFormValidator),
    defaultValues: {
      status: data?.status ?? USER_STATUS.INACTIVE,
      name: data?.name ?? '',
      email: data?.email ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      role: data?.role ?? USER_ROLE.ADMIN
    }
  });

  const onSubmit: SubmitHandler<CreateUserDto> = async formData => {
    if (isEditMode) {
      usersState.updateRequest({ id: data.id, data: formData });
    } else {
      usersState.createRequest(formData);
    }
  };

  return (
    <div data-testid="frm-user">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormToolbar
            title={t('user_details')}
            className="mb-4"
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
                <UserFormFields form={form} />
                <UserFormRole form={form} />
              </CardContent>
            </Card>
            <div className="w-72 shrink-0">
              <div className="grid gap-4">
                <UserFormStatus form={form} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
