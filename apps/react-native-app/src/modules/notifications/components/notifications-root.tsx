import React, { FC } from 'react';

import { NotificationEntity } from '../interfaces/notifications.interface';

import { NOTIFICATION_TYPE } from '../constants/notification.constant';

import NotificationList from './notification-list';

const items: NotificationEntity[] = [
  {
    id: '1',
    title: 'Tour Booked Successfully',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, dignissimos',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: false,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Tour Booked Successfully',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consequuntur ratione',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Tour Booked Successfully',
    message:
      'Reiciendis, minima obcaecati incidunt beatae ab nihil eligendi dignissimos accusamus accusantium sint nisi inventore quasi aliquam',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Tour Booked Successfully',
    message:
      'Praesentium laborum quo labore non doloribus enim consectetur, ab excepturi fugiat nam accusamus molestias dolorem',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Tour Booked Successfully',
    message: 'Sint quod praesentium ducimus, harum deleniti culpa obcaecati architecto blanditiis suscipit atque porro',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  },
  {
    id: '6',
    title: 'Tour Booked Successfully',
    message: 'Server is already running for this project on port',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  },
  {
    id: '7',
    title: 'Tour Booked Successfully',
    message: 'Server is already running for this project on port',
    type: NOTIFICATION_TYPE.SYSTEM,
    isRead: true,
    createdAt: new Date()
  }
];

type NotificationsRootProps = {};

const NotificationsRoot: FC<NotificationsRootProps> = () => {
  return <NotificationList items={items} />;
};

export default NotificationsRoot;
