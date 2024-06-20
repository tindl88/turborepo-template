import React from 'react';
import { CheckIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { LanguageEntity } from '../interfaces/language.interface';

import Text from '@/components/core-ui/text';

import { useThemeState } from '@/modules/theme/states/theme.state';

type LanguageItemProps = {
  item: LanguageEntity;
  selectedLanguage: string;
  onSelectLanguage: (lang: LanguageEntity) => void;
};
const LanguageItem: React.FC<LanguageItemProps> = ({ item, selectedLanguage, onSelectLanguage }) => {
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
      onPress={() => onSelectLanguage(item)}
    >
      <Text fontWeight="Bold">{item.value}</Text>
      {selectedLanguage === item.key && <CheckIcon size={24} color={configs.primary} strokeWidth={1.5} />}
    </Pressable>
  );
};

export default LanguageItem;
