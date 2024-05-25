import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';

import {useScreenState} from '@/modules/screen/states/screen.state';

import NavigationHeader from '@/components/common/header/general';
import {StatusBar, Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {AuthenticatedParamList} from '@/common/interfaces';

type Props = StackScreenProps<AuthenticatedParamList, 'PostDetail'>;

function PostDetailScreen({}: Props) {
  const screenState = useScreenState();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>B.S. in Computer Science, XYZ University</Text>
            <Text style={styles.sectionItem}>M.S. in Computer Science, ABC University</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Software Engineer, ABC Company (2022-present)</Text>
              <Text style={styles.sectionItemDesc}>
                - Worked on the development of the company's flagship product, a cloud-based project management tool -
                Implemented new features and improvements to the tool using React and Redux - Collaborated with the
                design team to ensure a seamless user experience
              </Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Software Intern, XYZ Company (2020-2021)</Text>
              <Text style={styles.sectionItemDesc}>
                - Assisted the development team in the creation of a mobile app for event ticketing - Worked with React
                Native and Firebase to implement features such as ticket purchasing and QR code scanning - Participated
                in code reviews and team meetings to ensure code quality
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Personal Post (2021)</Text>
              <Text style={styles.sectionItemDesc}>
                - Created a personal Post using Gatsby and GraphQL - Implemented a custom design and added features such
                as dark mode and search - Deployed the site using AWS Amplify
              </Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Recipe App (2020)</Text>
              <Text style={styles.sectionItemDesc}>
                - Developed a recipe search app using React and the Spoonacular API - Implemented features such as
                saving favorite recipes and filtering by dietary restrictions - Published the app on the App Store and
                Google Play Store
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: 'white'
  },
  header: {
    alignItems: 'center',
    marginBottom: 16
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontSize: 24,
    fontWeight: '600'
  },
  title: {
    fontSize: 16,
    color: 'gray'
  },
  body: {},
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  sectionContent: {
    marginTop: 8
  },
  sectionItem: {
    marginVertical: 4
  },
  sectionItemTitle: {
    fontSize: 14,
    fontWeight: '600'
  },
  sectionItemDesc: {
    fontSize: 14,
    color: 'gray'
  }
});
