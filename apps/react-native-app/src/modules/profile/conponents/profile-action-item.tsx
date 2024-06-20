import React, { FC } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

type ProfileActionItemProps = {
  item: ProfileAction;
  style?: StyleProp<ViewStyle>;
};

const ProfileActionItem: FC<ProfileActionItemProps> = ({ item, style }) => {
  const { configs } = useThemeState();

  return (
    <>
      <Pressable style={[ds.py14, ds.row, ds.itemsCenter, ds.justifyBetween, style]} onPress={item.action}>
        <View style={[ds.row, ds.itemsCenter, ds.gap10]}>
          {item.icon && <item.icon color={configs.primary} />}
          <Text fontSize={18} fontWeight="Bold">
            {item.name}
          </Text>
        </View>
        <View style={[ds.row, ds.itemsCenter, ds.gap6]}>
          {typeof item.value === 'string' && <Text>{item.value}</Text>}
          {item.type === 'sub' && <ChevronRight color={configs.primary} />}
        </View>
      </Pressable>
    </>
  );
};

export default ProfileActionItem;
