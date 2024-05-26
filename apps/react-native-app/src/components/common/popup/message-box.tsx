import React, { FC } from 'react';
import { View } from 'react-native';

import { Button, Heading, Text } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

interface IMessageBoxProps {
  title?: string | null;
  message?: string | null;
  btnClose?: string | null;
  onClose: () => void;
}

const MessageBox: FC<IMessageBoxProps> = ({ title = '', message = '', btnClose = 'Close', onClose }) => {
  return (
    <View>
      <Heading>{title}</Heading>
      <View style={[ds.pt8]}>
        <Text>{message}</Text>
      </View>
      <View>
        <Button color="secondary" text={btnClose} style={[ds.wFull]} onPress={onClose} />
      </View>
    </View>
  );
};

export default MessageBox;
