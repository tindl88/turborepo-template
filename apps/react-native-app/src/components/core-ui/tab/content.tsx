import React, { FC, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { useTab } from './state';

export interface ITabContentProps {
  children: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const Content: FC<ITabContentProps> = ({ children, label, style }) => {
  const tab = useTab();

  return tab.state.activeTab === label ? <View style={[ds.mt10, ds.px0, style]}>{children}</View> : null;
};

export default Content;
