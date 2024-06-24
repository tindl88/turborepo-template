import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, ds } from '~react-native-design-system';

import Divider from '@/components/core-ui/divider';
import Heading from '@/components/core-ui/heading';
import Input from '@/components/core-ui/input';
import Loading from '@/components/core-ui/loading';
import Pagination from '@/components/core-ui/pagination';
import ProgressBar from '@/components/core-ui/progressbar';
import StatusBar from '@/components/core-ui/statusbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core-ui/tabs';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import NavigationHeader from '@/modules/navigation/components/navigation-header';
import { AuthenticatedStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import { getHeaderTitle } from '@/modules/navigation/utils/navigation.util';

function UIScreen({ route }: AuthenticatedStackProps<'UI'>) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
      <Divider />
      <ScrollView style={[ds.flex1, ds.px10]}>
        <Tabs defaultValue="tab-ui-kit">
          <TabsList>
            <TabsTrigger value="tab-ui-kit">
              <Text>UI Kit</Text>
            </TabsTrigger>
            <TabsTrigger value="tab-components">
              <Text>Components</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-ui-kit">
            <Heading as={'h1'} text="Heading 1" />
            <Heading as={'h2'}>Heading 2</Heading>
            <Heading as={'h3'}>Heading 3</Heading>
            <Heading as={'h4'}>Heading 4</Heading>
            <Heading as={'h5'}>Heading 5</Heading>
            <Heading as={'h6'}>Heading 6</Heading>
            <Divider />
            <Heading as="h4" text="Pagination" />
            <Text>{`Current Page: ${currentPage}`}</Text>
            <Heading as="h5" text="Full" />
            <Pagination
              totalItems={100}
              currentPage={currentPage}
              onChange={page => {
                setCurrentPage(page);
              }}
            />
            <Heading as="h5" text="Minimal" />
            <Pagination
              type="minimal"
              totalItems={100}
              currentPage={currentPage}
              onChange={page => {
                setCurrentPage(page);
              }}
            />
            <Divider />
            <Heading as="h4" text="Text and Paragraph" />
            <Divider />
            <Text>Hello</Text>
            <Text>Hola</Text>
            <Text>Xin chào</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, doloremque?</Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, fugiat atque fugit nostrum velit dicta
              recusandae? Cupiditate illo nam vero.
            </Text>
            <Heading as="h4" text="Progress Bar" />
            <Divider />
            <View>
              <ProgressBar />
              <Divider />
              <ProgressBar value={10} barColor={Colors.blue[500]} trackColor={Colors.gray[50]} />
              <Divider />
              <ProgressBar value={30} barColor={Colors.cyan[500]} height={12} />
              <Divider />
              <ProgressBar value={50} barColor={Colors.pink[500]} height={16} showText={true} text="50/100" />
            </View>
            <Divider />
            <Heading as="h4" text="Loading" />
            <Divider />
            <Loading size={64} thickness={6} />
            <Divider />
            <Heading as="h4" text="Input" />
            <Divider />
            <Input defaultValue="text" />
            <Divider />
            <Heading as="h4" text="Icons" />
            <Divider />
            <Icon name="x" size={30} color="#900" />
            <Divider />
            <Heading as="h4" text="Image" />
            <Divider />
            <Image
              style={[ds.wFull, ds.h208] as ImageStyle}
              source={{
                uri: 'https://images.unsplash.com/photo-1522139137660-4248e04955b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
              }}
            />
          </TabsContent>
          <TabsContent value="tab-components" />
        </Tabs>
      </ScrollView>
    </View>
  );
}

export default UIScreen;
