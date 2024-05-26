import React, { useState } from 'react';
import { View } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import { hideGlobalModal, showGlobalModal } from '@/components/common/modal/global-modal';
import AutomaticModal from '@/components/common/popup/automatic-modal';
import ConfirmBox from '@/components/common/popup/confirm-box';
import ErrorBox from '@/components/common/popup/error-box';
import Expandable from '@/components/common/popup/expandable';
import LongContent from '@/components/common/popup/long-content';
import NestedModal from '@/components/common/popup/nest-modal';
import Progress from '@/components/common/popup/progress';
import ScrollingContent from '@/components/common/popup/scrolling-content';
import {
  Button,
  Divider,
  Heading,
  Image,
  Input,
  Loading,
  Pagination,
  ProgressBar,
  StatusBar,
  Tab,
  Text
} from '@/components/core-ui';

import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'UI'>,
  StackScreenProps<AuthenticatedParamList>
>;

function UIScreen({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const screenState = useScreenState();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <Divider />
      <ScrollView style={[ds.flex1, ds.px10]}>
        <Tab>
          <Tab.List active="tab-ui-kit">
            <Tab.Item label="tab-ui-kit">UI Kit</Tab.Item>
            <Tab.Item label="tab-components">Components</Tab.Item>
          </Tab.List>
          <Tab.Content label="tab-ui-kit">
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
            <Loading />
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
          </Tab.Content>
          <Tab.Content label="tab-components">
            <View>
              <Button
                onPress={() => showGlobalModal({ modalKey: 'modal-error', Component: ErrorBox1, hideClose: true })}
              >
                Hiện lỗi
              </Button>
              <Button onPress={() => showGlobalModal({ Component: AutomaticModal })}>Open 3 Modals</Button>
              <Button onPress={() => showGlobalModal({ Component: NestedModal })}>Nested Modal</Button>
              <Button onPress={() => showGlobalModal({ Component: Progress })}>Progress Modal</Button>
              <Button
                onPress={() =>
                  showGlobalModal({ modalKey: 'confirmation-modal', Component: Confirmation1, hideClose: true })
                }
              >
                Confirmation Modal
              </Button>
              <Button onPress={() => showGlobalModal({ Component: LongContent })}>Long Content Modal</Button>
              <Button onPress={() => showGlobalModal({ Component: ScrollingContent })}>Scrolling Content Modal</Button>
              <Button onPress={() => showGlobalModal({ Component: Expandable, disableLayoutChangeAnimation: true })}>
                Expandable
              </Button>
              <Button
                onPress={() => {
                  showGlobalModal({ Component: NestedModal });
                  setTimeout(() => {
                    showGlobalModal({ Component: Progress });
                    setTimeout(() => {
                      showGlobalModal({ modalKey: 'confirmation-modal', Component: Confirmation1, hideClose: true });
                      setTimeout(() => {
                        showGlobalModal({ Component: LongContent });
                        setTimeout(() => {
                          showGlobalModal({ Component: ScrollingContent });
                          setTimeout(() => {
                            showGlobalModal({ Component: Expandable });
                          });
                        }, 1000);
                      }, 1000);
                    }, 1000);
                  }, 1000);
                }}
              >
                Show All
              </Button>
            </View>
          </Tab.Content>
        </Tab>
      </ScrollView>
    </View>
  );
}

export default UIScreen;

const ErrorBox1 = () => {
  return (
    <ErrorBox
      title={'Are you sure?'}
      onClose={() => hideGlobalModal('modal-error')}
      onAction={() => hideGlobalModal('modal-error')}
    />
  );
};

const Confirmation1 = () => {
  return (
    <ConfirmBox
      title={'Are you sure?'}
      message={'Are you sure?'}
      btnConfirmText={'dsfa'}
      btnCancelText={'dsfa'}
      onCancel={() => hideGlobalModal('modal-confirmation')}
      onConfirm={() => hideGlobalModal('modal-confirmation')}
    />
  );
};
