import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { createStyle } from '@/utils/stylesheet.util';

interface IContextProps {
  active: string;
  setActive: (id: string) => void;
}
const Context = createContext<IContextProps>({
  active: '',
  setActive: () => {}
});

interface ITravelCategoriesProps {
  defaultValue?: string;
  children: React.ReactNode;
  onChange?: (id: string) => void;
}
function TravelCategories({ defaultValue, children, onChange }: ITravelCategoriesProps) {
  const [active, setActive] = useState(defaultValue ?? '');

  useEffect(() => {
    if (active) onChange?.(active);
  }, [active]);

  return <Context.Provider value={{ active, setActive }}>{children}</Context.Provider>;
}

interface ICategoryListProps extends React.ComponentPropsWithoutRef<typeof View> {}

function TravelCategoryList({ ...props }: ICategoryListProps) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={ds.row} {...props} />
    </ScrollView>
  );
}

interface ICategoryTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  onPress?: () => void;
  value: string;
}

function TravelCategoryTrigger({ value, children, style, ...props }: ICategoryTriggerProps) {
  const { active, setActive } = useContext(Context);
  const { theme } = useThemeState();

  return (
    <Pressable
      style={
        [
          ds.grow,
          theme.key === 'dark' ? ds.bgSlate800 : ds.bgZinc100,
          active === value && [theme.key === 'dark' ? ds.bgBlack : ds.bgWhite, styles.shadow()],
          style
        ] as ViewStyle
      }
      onPress={() => setActive(value)}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export { TravelCategories, TravelCategoryList, TravelCategoryTrigger };

const styles = createStyle({
  shadow: (): ViewStyle => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 5.46,

      elevation: 6
    };
  }
});
