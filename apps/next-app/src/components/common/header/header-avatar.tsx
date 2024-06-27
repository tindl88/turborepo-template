import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { User } from 'next-auth';
import classNames from 'classnames';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~ui/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~ui/components/ui/dropdown-menu';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { useAuthState } from '@/modules/auth/states/auth.state';

import { getShortName } from '~shared-universal/utils/string.util';

type HeaderAvatarProps = {
  user?: User;
} & ComponentBaseProps;

const HeaderAvatar: FC<HeaderAvatarProps> = ({ className, user }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authState = useAuthState();

  const shortName = getShortName(user?.name);

  return (
    <div className={classNames('nap-header', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback className="bg-primary font-medium text-white">{shortName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="bottom" align="end">
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
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-x-2 py-2.5"
            onClick={() => authState.signOut({ redirect: true, callbackUrl: '/login' })}
          >
            <LogOutIcon strokeWidth={1.5} size={20} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderAvatar;
