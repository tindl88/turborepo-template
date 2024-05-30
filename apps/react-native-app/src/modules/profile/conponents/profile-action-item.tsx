import React, { FC } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useTheme } from '@/modules/theme/components/provider';

type ProfileActionItemProps = {
  item: ProfileAction;
  style?: StyleProp<ViewStyle>;
};

const ProfileActionItem: FC<ProfileActionItemProps> = ({ item, style }) => {
  const { themeConfigs } = useTheme();

  return (
    <>
      <Pressable style={[ds.py14, ds.row, ds.itemsCenter, ds.justifyBetween, style]} onPress={item.action}>
        <View style={[ds.row, ds.itemsCenter, ds.gap10]}>
          {item.icon && <item.icon color={themeConfigs.primary} />}
          <Text fontSize={18} fontWeight="Bold">
            {item.name}
          </Text>
        </View>
        {item.type === 'sub' && <ChevronRight color={themeConfigs.primary} style={[ds.absolute, ds.right6ne]} />}
      </Pressable>
    </>
  );
};

export default ProfileActionItem;
