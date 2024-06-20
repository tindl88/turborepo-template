import React from 'react';
import { CheckIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { ThemeEntity } from '../interfaces/theme.interface';

import Text from '@/components/core-ui/text';

import { useThemeState } from '@/modules/theme/states/theme.state';

type ThemeItemProps = {
  item: ThemeEntity;
  selectedTheme: string;
  onSelectTheme: (lang: ThemeEntity) => void;
};
const ThemeItem: React.FC<ThemeItemProps> = ({ item, selectedTheme, onSelectTheme }) => {
  const { configs } = useThemeState();

  return (
    <Pressable
      style={[
        ds.row,
        ds.itemsCenter,
        ds.justifyBetween,
        ds.h56,
        ds.px14,
        ds.border1,
        ds.rounded12,
        dynamicStyles.background(configs.card),
        dynamicStyles.border(configs.border)
      ]}
      onPress={() => onSelectTheme(item)}
    >
      <Text fontWeight="Bold">{item.value}</Text>
      {selectedTheme === item.key && <CheckIcon size={24} color={configs.primary} strokeWidth={1.5} />}
    </Pressable>
  );
};

export default ThemeItem;
