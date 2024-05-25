import React, {FC, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';

import {Heading} from '@/components/core-ui';
import {Colors, DesignSystem as ds} from '@/components/core-ui/themes';
import {Button} from '@/components/ui/button';

interface IErrorBoxProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  btnActionText?: string;
  btnCloseText?: string;
  onClose?: () => void;
  onAction?: () => void;
}
const {width, height} = Dimensions.get('window');

const ErrorBox: FC<IErrorBoxProps> = ({
  icon,
  title,
  message,
  btnActionText = 'Action',
  btnCloseText,
  onClose,
  onAction
}) => {
  const {t} = useTranslation();

  return (
    <View style={[ds.px4, ds.bgBlue600, {width, height}]}>
      <View>
        {icon}
        <Heading as="h2" text={title} color={Colors.white} style={ds.mt20} />
        <Heading as="h4" text={message} color={Colors.white} style={ds.mt14} />
      </View>
      <View style={[ds.row]}>
        <Button label={btnActionText} style={[ds.grow, ds.mr8]} onPress={onAction} />
        <Button label={btnCloseText || t('close')} style={[ds.grow, ds.ml8]} onPress={onClose} />
      </View>
    </View>
  );
};

export default ErrorBox;
