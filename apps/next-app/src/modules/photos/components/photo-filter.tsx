import React, { ChangeEventHandler, FC } from 'react';
import classNames from 'classnames';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type PhotoFilterProps = {
  value?: string;
  onTextChange?: ChangeEventHandler<HTMLInputElement>;
} & ComponentBaseProps;

const PhotoFilter: FC<PhotoFilterProps> = ({ className, value, onTextChange, ...rest }) => {
  return (
    <div className={classNames('photo-filter', className)} data-testid="photo-filter" {...rest}>
      <label htmlFor="search">Search</label>
      <Input type="search" id="search" value={value} data-testid="txt-keyword" onChange={onTextChange} />
    </div>
  );
};

export default PhotoFilter;
