import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { ds } from '~react-native-design-system';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

type ProfileVersionProps = {
  style?: StyleProp<ViewStyle>;
};

const ProfileVersion: FC<ProfileVersionProps> = ({ style }) => {
  const buildNumber = VersionCheck.getCurrentBuildNumber();
  const version = VersionCheck.getCurrentVersion();

  return (
    <View style={[ds.itemsCenter, style]}>
      <Text>{`Bully - ${version} build ${buildNumber}`}</Text>
    </View>
  );
};

export default ProfileVersion;
