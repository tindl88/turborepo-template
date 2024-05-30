import React, { createContext, useContext, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

import Text from './text';

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

interface ITabsListProps extends React.ComponentPropsWithoutRef<typeof View> {}
function TabsList({ ...props }: ITabsListProps) {
  const { themeConfigs } = useTheme();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[ds.p6, ds.wFull]}
      style={[ds.rounded12, styles.tabList(themeConfigs.card)]}
    >
      <View style={ds.row} {...props} />
    </ScrollView>
  );
}

interface ITabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  value: string;
}
function TabsTrigger({ value, children, ...props }: ITabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        ds.px12,
        ds.py10,
        ds.rounded8,
        ds.grow,
        ds.itemsCenter,
        ds.justifyCenter,
        activeTab === value && [theme === 'dark' ? ds.bgBlack : ds.bgWhite],
        styles.shadow()
      ]}
      onPress={() => setActiveTab(value)}
      {...props}
    >
      <Text fontWeight="Bold">{children}</Text>
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
  },
  shadow: (): ViewStyle => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2
    };
  }
});
