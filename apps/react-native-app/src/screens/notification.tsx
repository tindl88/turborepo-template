import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';

import {useThemeState} from '@/modules/themes/states/themes.state';

import NavigationHeader from '@/components/common/header/general';
import {StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {AuthenticatedParamList} from '@/common/interfaces';

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
  const themeState = useThemeState();

  const backgroundColor = themeState.configs?.background;

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
            <View style={styles.container}>
              <Pressable onPress={() => {}}>
                <FastImage style={styles.image} source={{uri: notification.image}} />
              </Pressable>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{notification.name}</Text>
                  <Text style={styles.time}>9:58 am</Text>
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

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  background(color?: string): ViewStyle;
}>({
  background: color => {
    return {backgroundColor: color};
  }
});
