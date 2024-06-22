import React, { FC, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ds } from '~react-native-design-system';

import Text from '@/components/core-ui/text';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { sleep } from '@/utils/miscs.util';

import { hideGlobalModal } from './global-modal/global-modal';

interface IModalSuccessProps {
  redirectTo?: () => void;
  onClose?: () => void;
}

const ModalSuccess: FC<IModalSuccessProps> = ({ redirectTo }) => {
  const { t } = useTranslation();
  const animationRef = useRef<LottieView>(null);
  const { configs } = useThemeState();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  useEffect(() => {
    const handleModalAndRedirect = async () => {
      await sleep(2500);
      hideGlobalModal('modal-success');
      await sleep(300);
      if (redirectTo) {
        redirectTo();
      }
    };

    handleModalAndRedirect();
  }, []);

  return (
    <View style={[ds.column, ds.justifyCenter, ds.itemsCenter, ds.p20, { backgroundColor: configs.card }]}>
      <LottieView
        ref={animationRef}
        loop={false}
        source={require('@/assets/animations/anim-error.json')}
        style={[ds.w128, ds.h128]}
      />
      <Text fontWeight="Bold" style={ds.textCenter}>
        {t('modal_success_message')}
      </Text>
    </View>
  );
};

export default ModalSuccess;
