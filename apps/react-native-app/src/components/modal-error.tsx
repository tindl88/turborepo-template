import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { Colors, ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import Heading from '@/components/core-ui/heading';

interface INodalErrorProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  btnActionText?: string;
  btnCloseText?: string;
  onClose?: () => void;
  onAction?: () => void;
}
const { width, height } = Dimensions.get('window');

const NodalError: FC<INodalErrorProps> = ({
  icon,
  title,
  message,
  btnActionText = 'Action',
  btnCloseText,
  onClose,
  onAction
}) => {
  const { t } = useTranslation();

  return (
    <View style={[ds.px4, ds.bgBlue600, { width, height }]}>
      <View>
        {icon}
        <Heading as="h2" text={title} color={Colors.white} style={ds.mt20} />
        <Heading as="h4" text={message} color={Colors.white} style={ds.mt14} />
      </View>
      <View style={[ds.row]}>
        <Button onPress={onAction}>{btnActionText}</Button>
        <Button onPress={onClose}>{btnCloseText || t('close')}</Button>
      </View>
    </View>
  );
};

export default NodalError;
