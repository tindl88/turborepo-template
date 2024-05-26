import React, { FC, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ICoreUIBaseProps } from '../types';

import Content, { ITabContentProps } from './content';
import { ITabItemProps, Item } from './item';
import List, { ITabListProps } from './list';
import Panel, { ITabPanelProps } from './panel';
import { Provider } from './state';

interface ITabsComposition {
  List: FC<ITabListProps>;
  Item: FC<ITabItemProps>;
  Panel: FC<ITabPanelProps>;
  Content: FC<ITabContentProps>;
}

interface ITabsProps extends ICoreUIBaseProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Tabs: FC<ITabsProps> & ITabsComposition = ({ children, visible = true, style }) => {
  if (!visible) return null;

  return (
    <Provider>
      <View style={style}>{children}</View>
    </Provider>
  );
};

Tabs.Item = Item;
Tabs.List = List;
Tabs.Content = Content;
Tabs.Panel = Panel;

export default Tabs;
