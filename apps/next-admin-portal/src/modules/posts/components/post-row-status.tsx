import React, { FC } from 'react';
import classNames from 'classnames';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~ui/components/ui/tooltip';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { POST_STATUS, POST_STATUSES } from '../constants/posts.constant';

type PostRowStatusProps = {
  status: {
    value: string;
    label: string;
    icon: FC;
  };
  rejectReason?: string;
} & ComponentBaseProps;

const PostRowStatus: FC<PostRowStatusProps> = ({ className, status, rejectReason }) => {
  const isRejected = status.value === POST_STATUS.REJECTED;

  const statusValue = POST_STATUSES.find(item => item.value === status.value);

  return (
    <div className={classNames('posts-statuses', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={classNames(
                'inline-flex items-center gap-x-1 rounded px-2 py-1 text-sm',
                isRejected ? 'cursor-pointer' : 'cursor-default',
                statusValue?.textClassName,
                statusValue?.bgClassName,
                statusValue?.borderClassName
              )}
            >
              <span>{status.label}</span>
              {isRejected && <InfoIcon size={16} className={statusValue?.iconClassName} />}
            </div>
          </TooltipTrigger>
          {isRejected && rejectReason && <TooltipContent>{rejectReason}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostRowStatus;
