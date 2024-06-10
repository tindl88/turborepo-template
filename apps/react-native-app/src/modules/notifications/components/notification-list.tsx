import React, { FC } from 'react';
import { ds } from '@/design-system';

import { NotificationEntity } from '../interfaces/notifications.interface';

import View from '@/components/core-ui/view';

import NotificationItem from './notification-item';

type NotificationListProps = {
  items: NotificationEntity[];
};

const NotificationList: FC<NotificationListProps> = ({ items }) => {
  return (
    <View style={ds.gap10}>
      {items.map(item => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default NotificationList;
