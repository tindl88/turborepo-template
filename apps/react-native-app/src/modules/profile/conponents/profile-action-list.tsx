import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import { ProfileAction } from '../interfaces/profile.interface';

import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { createStyle } from '@/utils/stylesheet.util';

import ProfileActionItem from './profile-action-item';

type ProfileActionListProps = {
  items: ProfileAction[];
  style?: StyleProp<ViewStyle>;
};

const ProfileActionList: FC<ProfileActionListProps> = ({ items, style }) => {
  const { configs } = useThemeState();

  return (
    <View style={[ds.px14, style]}>
      {items?.map(item => (
        <ProfileActionItem key={item.name} item={item} style={[ds.borderB1, styles.border(configs.border)]} />
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
