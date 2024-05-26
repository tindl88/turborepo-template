import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Heading, Text } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';
import { Button } from '@/components/ui/button';

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
        <Button
          label={btnCancelText || t('calcel')}
          style={[ds.grow, ds.border1, ds.borderRSlate200]}
          onPress={onCancel}
        />
        <Button label={btnConfirmText || t('confirm')} style={[ds.grow]} onPress={onConfirm} />
      </View>
    </View>
  );
};

export default ConfirmBox;
