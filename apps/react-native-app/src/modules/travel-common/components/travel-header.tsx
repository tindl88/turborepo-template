import React from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/core-ui/avatar';
import Text from '@/components/core-ui/text';
import Icon from '@/components/icon';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { AuthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

function TravelHeader() {
  const navigation = useNavigation<AuthenticatedNavigationProps>();
  const { configs } = useThemeState();
  const authState = useAuthState();

  const userAvatar = authState.auth?.avatar;
  const userName = authState.auth?.name;
  const foregroundColor = configs.foreground;

  return (
    <View style={[ds.mx14, ds.mt10]}>
      <View style={[ds.relative, ds.roundedFull, dynamicStyles.background(configs.card)]}>
        <View style={[ds.row, ds.justifyBetween, ds.itemsCenter, ds.pl16, ds.pr6, ds.py6]}>
          <View style={[ds.row, ds.shrink, ds.justifyBetween]}>
            <View style={[ds.row, ds.shrink, ds.itemsCenter]}>
              <Pressable style={ds.shrink} onPress={() => navigation.toggleDrawer()}>
                <Icon name="Menu" size={28} />
              </Pressable>
              <Text style={[ds.grow, ds.pl12]} color={foregroundColor} onPress={() => navigation.navigate('Search')}>
                Search
              </Text>
            </View>
            <View style={[ds.row, ds.gap2, ds.mr10]}>
              <Pressable
                style={ds.p6}
                onPress={() => navigation.navigate('NotificationStack', { screen: 'Notifications' })}
              >
                <Icon name="Bell" size={28} />
              </Pressable>
            </View>
          </View>
          <Avatar onPress={() => navigation.navigate('ProfileStack', { screen: 'Profile' })}>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </View>
      </View>
    </View>
  );
}

export default TravelHeader;
