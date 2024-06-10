import React from 'react';
import { Pressable, View } from 'react-native';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/core-ui/avatar';
import Text from '@/components/core-ui/text';
import IconBell from '@/components/svgs/ico-bell';
import IconMenu from '@/components/svgs/ico-menu';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { AuthenticatedParamList, TravelBottomTabParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

function TravelHeader() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<TravelBottomTabParamList>,
        DrawerNavigationProp<AuthenticatedParamList>
      >
    >();
  const { configs } = useThemeState();
  const authState = useAuthState();

  const userAvatar = authState.auth?.user.avatar;
  const userName = authState.auth?.user.name;
  const foregroundColor = configs.foreground;

  return (
    <View style={[ds.mx14, ds.mt10]}>
      <View style={[ds.relative, ds.roundedFull, dynamicStyles.background(configs.card)]}>
        <View style={[ds.row, ds.justifyBetween, ds.itemsCenter, ds.pl16, ds.pr6, ds.py6]}>
          <View style={[ds.row, ds.shrink, ds.justifyBetween]}>
            <View style={[ds.row, ds.shrink, ds.itemsCenter]}>
              <Pressable style={ds.shrink} onPress={() => navigation.toggleDrawer()}>
                <IconMenu color={foregroundColor} />
              </Pressable>
              <Text style={[ds.grow, ds.pl12]} color={foregroundColor} onPress={() => navigation.navigate('Search')}>
                Search
              </Text>
            </View>
            <View style={[ds.row, ds.gap2, ds.mr10]}>
              <Pressable style={ds.p6} onPress={() => navigation.navigate('NotificationStack')}>
                <IconBell color={foregroundColor} />
              </Pressable>
            </View>
          </View>
          <Avatar onPress={() => navigation.navigate('ProfileStack')}>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </View>
      </View>
    </View>
  );
}

export default TravelHeader;
