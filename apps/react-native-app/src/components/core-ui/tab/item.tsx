import React, { FC, ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import Text from '../text';

import { useTab } from './state';

export interface ITabItemProps {
  children: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const Item: FC<ITabItemProps> = ({ label, children, style }) => {
  const tab = useTab();

  return (
    <View>
      <Pressable
        style={[
          ds.px8,
          ds.py6,
          ds.border1,
          ds.borderTransparent,
          tab.state.activeTab === label && [ds.bgSlate800, ds.rounded6, ds.borderGray50],
          style
        ]}
        onPress={() => tab.setActiveTab(label)}
      >
        <Text>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Item;
