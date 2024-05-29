import React, { useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

const data = [
  {
    id: 1,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Frank Odalthh',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 2,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'John DoeLink',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 3,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'March SoulLaComa',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 4,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Finn DoRemiFaso',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 5,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Maria More More',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 6,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Clark June Boom!',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  },
  {
    id: 7,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'The googler',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
  }
];

type Props = StackScreenProps<AuthenticatedParamList, 'Notification'>;

function NotificationScreen({}: Props) {
  const [comments] = useState(data);
  const { themeConfigs } = useTheme();

  const backgroundColor = themeConfigs.background;

  return (
    <View style={[ds.flex1, styles.background(backgroundColor)]}>
      <StatusBar />
      <NavigationHeader title="Notification" />
      <FlashList
        data={comments}
        estimatedItemSize={110}
        ItemSeparatorComponent={() => null}
        keyExtractor={item => item.id.toString()}
        renderItem={item => {
          const notification = item.item;

          return (
            <View style={ds.flex1}>
              <Pressable onPress={() => {}}>
                <FastImage source={{ uri: notification.image }} />
              </Pressable>
              <View>
                <View>
                  <Text>{notification.name}</Text>
                  <Text>9:58 am</Text>
                </View>
                <Text>{notification.comment}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default NotificationScreen;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return { backgroundColor: color };
  }
});
