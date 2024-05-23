import React, { FC } from 'react';
import classNames from 'classnames';

import { Link } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type MenuProps = ComponentBaseProps;

const Menu: FC<MenuProps> = ({ className, ...rest }) => {
  return (
    <div className={classNames('menu ml-auto', className)} data-testid="main-menu" {...rest}>
      <Link className="p-2 text-white" href={'/'}>
        Home
      </Link>
      <Link className="p-2 text-white" href={'/blogs'}>
        Blogs
      </Link>
      <Link className="p-2 text-white" href={'/photos'}>
        Photos
      </Link>
      <Link className="p-2 text-white" href={'/game'}>
        Game
      </Link>
    </div>
  );
};

export default Menu;
