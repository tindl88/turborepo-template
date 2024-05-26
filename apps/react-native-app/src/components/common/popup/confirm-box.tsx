import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ds } from '@/design-system';

import { Button, Heading, Text } from '@/components/core-ui';

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
        <Button style={[ds.grow, ds.border1, ds.borderRSlate200]} onPress={onCancel}>
          {btnCancelText || t('calcel')}
        </Button>
        <Button style={[ds.grow]} onPress={onConfirm}>
          {btnConfirmText || t('confirm')}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmBox;
