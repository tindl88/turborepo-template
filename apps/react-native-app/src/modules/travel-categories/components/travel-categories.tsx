import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';
import { createStyle } from '~react-native-design-system/utils/stylesheet.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

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
  const { configs } = useThemeState();

  return (
    <Pressable
      style={
        [
          ds.grow,
          dynamicStyles.background(configs.card),
          active === value && [dynamicStyles.background(configs.accent), styles.shadow()],
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
