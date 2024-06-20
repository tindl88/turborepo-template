import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';

type Props = {
  title?: string | null;
  message?: string | null;
  btnYes?: string | null;
  btnNo?: string | null;
  onYes: () => void;
  onNo: () => void;
};

const Confirmation: FC<Props> = ({ message, btnYes = 'Yes', btnNo = 'No', onYes, onNo }) => {
  return (
    <View style={ds.wFull}>
      <Text>{message}</Text>
      <View style={ds.row}>
        <Button style={[ds.grow, ds.border1, ds.borderRSlate200]} onPress={onNo}>
          {btnNo}
        </Button>
        <Button style={[ds.grow]} onPress={onYes}>
          {btnYes}
        </Button>
      </View>
    </View>
  );
};

export default Confirmation;
