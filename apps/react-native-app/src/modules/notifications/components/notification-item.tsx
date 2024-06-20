import React, { FC } from 'react';
import { ClockIcon, RadioIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { NotificationEntity } from '../interfaces/notifications.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useLanguageState } from '@/modules/language/states/language.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

import { toDateTime } from '@/utils/date.util';

type NotificationItemProps = {
  item: NotificationEntity;
  onPress?: () => void;
};

const NotificationItem: FC<NotificationItemProps> = ({ item, onPress }) => {
  const { configs } = useThemeState();
  const { language } = useLanguageState();

  return (
    <Pressable
      style={[ds.rounded24, ds.px6, ds.py12, dynamicStyles.background(configs.card), !item.isRead && ds.bgPrimary100]}
      onPress={onPress}
    >
      <View style={[ds.row, ds.gap12]}>
        <View style={[ds.roundedFull, ds.w56, ds.h56, ds.itemsCenter, ds.justifyCenter, ds.bgStone200]}>
          <RadioIcon size={28} color={configs.primary} />
        </View>
        <View style={[ds.shrink]}>
          <Text fontWeight="Bold" fontSize={20}>
            {item.title}
          </Text>
          <Text style={ds.mt6}>{item.message}</Text>
          <View style={[ds.row, ds.gap8, ds.itemsCenter, ds.mt4]}>
            <ClockIcon size={18} color={configs.accentForeground} />
            <Text fontWeight="Medium" color={configs.accentForeground}>
              {toDateTime(item.createdAt, language.key)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationItem;
