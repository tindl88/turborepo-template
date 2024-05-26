import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import { Divider, StatusBar, Text } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Profile'>,
  StackScreenProps<AuthenticatedParamList>
>;

function ProfileScreen({}: Props) {
  const screenState = useScreenState();
  const [images] = useState([
    'https://www.bootdey.com/image/280x280/FF00FF/000000',
    'https://www.bootdey.com/image/280x280/00FFFF/000000',
    'https://www.bootdey.com/image/280x280/FF7F50/000000',
    'https://www.bootdey.com/image/280x280/6495ED/000000',
    'https://www.bootdey.com/image/280x280/DC143C/000000',
    'https://www.bootdey.com/image/280x280/008B8B/000000'
  ]);
  const [postCount] = useState(10);
  const [followingCount] = useState(20);
  const [followerCount] = useState(30);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <Divider />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <FastImage style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
          <Text style={styles.name}>John Doe</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{postCount}</Text>
              <Text style={styles.statsLabel}>Posts</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{followingCount}</Text>
              <Text style={styles.statsLabel}>Following</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{followerCount}</Text>
              <Text style={styles.statsLabel}>Followers</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <FastImage style={styles.image} source={{ uri: image }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  headerContent: {
    alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600'
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  statsBox: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  statsCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000'
  },
  statsLabel: {
    fontSize: 14,
    color: '#999999'
  },
  body: {
    alignItems: 'center',
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageContainer: {
    width: '33%',
    padding: 5
  },
  image: {
    width: '100%',
    height: 120
  }
});
