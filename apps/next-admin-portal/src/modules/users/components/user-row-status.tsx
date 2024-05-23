import React, { FC } from 'react';
import classNames from 'classnames';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~ui/components/ui/tooltip';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { USER_STATUS, USER_STATUSES } from '../constants/users.constant';

type UserRowStatusProps = {
  status: {
    value: string;
    label: string;
    icon: FC;
  };
  blockReason?: string;
} & ComponentBaseProps;

const UserRowStatus: FC<UserRowStatusProps> = ({ className, status, blockReason }) => {
  const statusValue = USER_STATUSES.find(item => item.value === status.value);
  const isBlocked = status.value === USER_STATUS.BLOCKED;

  return (
    <div className={classNames('users-statuses', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={classNames(
                'inline-flex items-center gap-x-1 rounded px-2 py-1 text-sm',
                isBlocked ? 'cursor-pointer' : 'cursor-default',
                statusValue?.textClassName,
                statusValue?.bgClassName,
                statusValue?.borderClassName
              )}
            >
              <span>{status.label}</span>
              {isBlocked && <InfoIcon size={16} className={statusValue?.iconClassName} />}
            </div>
          </TooltipTrigger>
          {isBlocked && blockReason && <TooltipContent>{blockReason}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UserRowStatus;
