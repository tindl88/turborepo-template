import React, {FC} from 'react';
import {Text, View} from 'react-native';

import {Button} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

type Props = {
  title?: string | null;
  message?: string | null;
  btnYes?: string | null;
  btnNo?: string | null;
  onYes: () => void;
  onNo: () => void;
};

const Confirmation: FC<Props> = ({message, btnYes = 'Yes', btnNo = 'No', onYes, onNo}) => {
  return (
    <View style={ds.wFull}>
      <Text>{message}</Text>
      <View style={ds.row}>
        <Button
          color="secondary"
          text={btnNo}
          rounded={0}
          style={[ds.grow, ds.border1, ds.borderRSlate200]}
          onPress={onNo}
        />
        <Button color="primary" text={btnYes} rounded={0} style={[ds.grow]} onPress={onYes} />
      </View>
    </View>
  );
};

export default Confirmation;
