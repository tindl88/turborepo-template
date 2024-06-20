import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/core-ui/avatar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import IconBell from '@/components/svgs/ico-bell';
import IconMenu from '@/components/svgs/ico-menu';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { AuthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

function HomeNavigationHeader() {
  const navigation = useNavigation<AuthenticatedNavigationProps>();
  const { configs } = useThemeState();
  const authState = useAuthState();

  const userAvatar = authState.auth?.avatar;
  const userName = authState.auth?.name;
  const foregroundColor = configs.foreground;

  return (
    <View style={[ds.mx12, ds.mt10]}>
      <View style={[dynamicStyles.background(configs.card), ds.relative, ds.roundedFull]}>
        <View style={[ds.row, ds.justifyBetween, ds.itemsCenter, ds.pl16, ds.pr4, ds.py4]}>
          <View style={[ds.row, ds.shrink, ds.justifyBetween]}>
            <View style={[ds.row, ds.shrink, ds.itemsCenter]}>
              <Pressable style={ds.shrink} onPress={() => navigation.toggleDrawer()}>
                <IconMenu color={foregroundColor} />
              </Pressable>
              <Text style={[ds.grow, ds.pl12]} color={foregroundColor} onPress={() => navigation.navigate('Search')}>
                Search
              </Text>
            </View>
            <View style={[ds.row]}>
              <Pressable
                style={ds.mr12}
                onPress={() => navigation.navigate('NotificationStack', { screen: 'Notifications' })}
              >
                <IconBell color={foregroundColor} />
              </Pressable>
            </View>
          </View>
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </View>
      </View>
    </View>
  );
}

export default HomeNavigationHeader;
