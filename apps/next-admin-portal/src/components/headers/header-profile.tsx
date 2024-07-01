import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~react-web-ui-shadcn/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~react-web-ui-shadcn/components/ui/dropdown-menu';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { UserEntity } from '@/modules/users/interfaces/users.interface';

import { getShortName } from '~shared-universal/utils/string.util';

type HeaderProfileProps = {
  user?: UserEntity;
} & ComponentBaseProps;

const HeaderProfile: FC<HeaderProfileProps> = ({ className, user }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authState = useAuthState();

  const shortName = getShortName(user?.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="animate-gradient bg-[linear-gradient(-45deg,_#ee7752,_#e73c7e,_#23a6d5,_#23d5ab)] bg-[length:200%_200%] font-bold text-white">
            {shortName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={classNames('w-56', className)} side="bottom" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 px-1.5 pb-1">
            <p className="text-sm font-medium leading-none">
              <strong className="text-base">{user?.name}</strong>
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-x-2 py-2.5"
          onClick={() =>
            router.push({
              pathname: '/profile',
              query: { sidebar: searchParams.get('sidebar') }
            })
          }
        >
          <UserIcon strokeWidth={1.5} size={20} />
          {t('profile')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-x-2 py-2.5"
          onClick={() => authState.signOut({ redirect: true, callbackUrl: '/login' })}
        >
          <LogOutIcon strokeWidth={1.5} size={20} />
          {t('signout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfile;
