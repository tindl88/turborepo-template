import {ScrollView} from 'react-native-gesture-handler';
import React, {FC, ReactNode, useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {DesignSystem as ds} from '../themes';

import {useTab} from './state';

export interface ITabListProps {
  children: ReactNode;
  active: string;
  style?: StyleProp<ViewStyle>;
  onChange?: (activeTab: string) => void;
}

export const List: FC<ITabListProps> = ({children, active = '', style, onChange}) => {
  const tab = useTab();

  useEffect(() => {
    tab.setActiveTab(active);
  }, []);

  useEffect(() => {
    onChange?.(tab.state.activeTab);
  }, [tab.state.activeTab]);

  return (
    <View style={[styles.component, style]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  component: {
    ...ds.p4,
    ...ds.rounded8,
    ...ds.bgSlate900
  },
  inner: {
    ...ds.row
  }
});
