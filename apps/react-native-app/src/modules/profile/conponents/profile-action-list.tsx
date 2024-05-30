import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import View from '@/components/core-ui/view';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

import ProfileActionItem from './profile-action-item';

type ProfileActionListProps = {
  items: ProfileAction[];
  style?: StyleProp<ViewStyle>;
};

const ProfileActionList: FC<ProfileActionListProps> = ({ items, style }) => {
  const { themeConfigs } = useTheme();

  return (
    <View style={[ds.px14, style]}>
      {items?.map((item, index) => (
        <ProfileActionItem
          key={item.name}
          item={item}
          style={[index < items.length - 1 && ds.borderB1, styles.border(themeConfigs.border)]}
        />
      ))}
    </View>
  );
};

export default ProfileActionList;

const styles = createStyle({
  border: (color: string): ViewStyle => {
    return {
      borderColor: color
    };
  }
});
