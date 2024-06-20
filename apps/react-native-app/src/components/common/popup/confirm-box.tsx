import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

interface IConfirmBoxProps {
  title?: string | null;
  message?: string | null;
  btnConfirmText?: string | null;
  btnCancelText?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmBox: FC<IConfirmBoxProps> = ({ title, message, btnConfirmText, btnCancelText, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <View>
      <Heading>{title}</Heading>
      <View style={[ds.pt8]}>
        <Text>{message}</Text>
      </View>
      <View style={[ds.row]}>
        <Button onPress={onCancel}>{btnCancelText || t('calcel')}</Button>
        <Button onPress={onConfirm}>{btnConfirmText || t('confirm')}</Button>
      </View>
    </View>
  );
};

export default ConfirmBox;
