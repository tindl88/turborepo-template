import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { ds } from '~react-native-design-system';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Separator from './core-ui/separator';

interface IModalConfirmProps {
  visible?: boolean;
  title?: string;
  message?: string;
  btnConfirmText?: string;
  btnCancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ModalConfirm: FC<IModalConfirmProps> = ({
  title,
  message,
  btnConfirmText,
  btnCancelText,
  onCancel,
  onConfirm
}) => {
  const { t } = useTranslation();
  const { configs } = useThemeState();

  return (
    <View style={[ds.column, { backgroundColor: configs.card }]}>
      <View style={ds.p20}>
        <Heading as="h4">{title}</Heading>
        <Text fontWeight="Medium" style={ds.mt20}>
          {message}
        </Text>
      </View>
      <Separator />
      <View style={ds.row}>
        <Pressable style={ds.grow} onPress={onCancel}>
          <Text fontWeight="Bold" style={[ds.textCenter, ds.p20]}>
            {btnCancelText || t('cancel')}
          </Text>
        </Pressable>
        <Separator orientation="vertical" />
        <Pressable style={ds.grow} onPress={onConfirm}>
          <Text fontWeight="Bold" color={configs.primary} style={[ds.textCenter, ds.p20]}>
            {btnConfirmText || t('confirm')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalConfirm;
