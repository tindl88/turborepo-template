import React, { FC, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { ds } from '@/design-system';

import Loading from '@/components/core-ui/loading';

import { useTheme } from '@/modules/theme/components/provider';

import { hideGlobalModal, showGlobalModal } from '../modal/global-modal';

interface ILoadingBoxProps {
  visible?: boolean;
  onClose?: () => void;
}

type LoadingProps = {
  visible?: boolean;
};
const Indicator: FC<LoadingProps> = ({ visible }) => {
  const { themeConfigs } = useTheme();

  return (
    <View style={[ds.p24, { backgroundColor: themeConfigs.card }]}>
      <Pressable onPress={() => hideGlobalModal('loading-modal')}>
        <Loading visible={visible} size={44} thickness={6} />
      </Pressable>
    </View>
  );
};

const LoadingBox: FC<ILoadingBoxProps> = ({ visible = false }) => {
  useEffect(() => {
    if (visible) {
      showGlobalModal({ modalKey: 'loading-modal', Component: Indicator, hideClose: true });
    } else {
      hideGlobalModal('loading-modal');
    }
  }, [visible]);

  return null;
};

export default LoadingBox;
