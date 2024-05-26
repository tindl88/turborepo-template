import React from 'react';
import { View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import { Loading, Pagination, StatusBar, Text } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';

import PostFilters from '@/modules/post/components/post-filter';
import { PostList } from '@/modules/post/components/post-list';
import { usePost } from '@/modules/post/hooks/use-post';
import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Post'>,
  StackScreenProps<AuthenticatedParamList>
>;

function PostScreen({ route }: Props) {
  const screenState = useScreenState();
  const { isLoading, error, data, meta, filter, setFilter } = usePost(route.params);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={screenState.name} />
      {isLoading && (
        <View>
          <Loading />
        </View>
      )}

      {error && (
        <View>
          <Text>Error fetching data</Text>
        </View>
      )}

      {!isLoading && !error && (
        <>
          <PostFilters value={filter.q} onTextChange={text => setFilter({ ...filter, q: text, page: 1 })} />
          <PostList items={data} />
          <Pagination
            totalItems={meta?.paging?.totalItems}
            currentPage={filter.page}
            itemPerPage={filter.limit}
            onChange={page => setFilter({ ...filter, page })}
          />
        </>
      )}
    </View>
  );
}

export default PostScreen;
