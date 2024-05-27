import React, { FC, ReactNode } from 'react';
import { View as RNView, ViewProps } from 'react-native';

import { ICoreUIBaseProps } from './types';

interface IViewProps extends ViewProps, ICoreUIBaseProps {
  children?: ReactNode;
}

const View: FC<IViewProps> = ({ children, visible = true, ...rest }) => {
  if (!visible) return null;

  return <RNView {...rest}>{children}</RNView>;
};

export default View;
