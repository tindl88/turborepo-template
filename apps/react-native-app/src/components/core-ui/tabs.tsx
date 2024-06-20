import React, { createContext, useContext, useState } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { createStyle } from '@/utils/stylesheet.util';

import View from './view';

interface ITabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}
const TabsContext = createContext<ITabsContextProps>({
  activeTab: '',
  setActiveTab: () => {}
});

interface ITabsProps {
  defaultValue: string;
  children: React.ReactNode;
}
function Tabs({ defaultValue, children }: ITabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}

interface ITabsListProps extends React.ComponentPropsWithoutRef<typeof View> {
  style?: StyleProp<ViewStyle>;
}
function TabsList({ style, ...props }: ITabsListProps) {
  const { configs } = useThemeState();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[ds.p6, ds.wFull]}
      style={[ds.rounded12, styles.tabList(configs.card), style]}
    >
      <View style={ds.row} {...props} />
    </ScrollView>
  );
}

interface ITabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
}
function TabsTrigger({ value, children, ...props }: ITabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const { theme } = useThemeState();

  return (
    <Pressable
      style={[
        ds.px12,
        ds.py10,
        ds.rounded8,
        ds.grow,
        ds.itemsCenter,
        ds.justifyCenter,
        activeTab === value && [theme.key === 'dark' ? ds.bgBlack : ds.bgWhite]
      ]}
      onPress={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </Pressable>
  );
}

interface ITabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
}
function TabsContent({ value, ...props }: ITabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  if (value === activeTab) return <View {...props} />;

  return null;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };

const styles = createStyle({
  tabList: (bgColor: string): ViewStyle => {
    return {
      backgroundColor: bgColor
    };
  }
});
