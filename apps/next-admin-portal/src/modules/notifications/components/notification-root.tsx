'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import PushNotificationPlayGround from './push-notification-playground';

const NotificationRoot = () => {
  const pathname = usePathname();

  return <div>{pathname.includes('/notifications/push') && <PushNotificationPlayGround />}</div>;
};

export default NotificationRoot;
