import React from 'react';
import { ds } from '@/design-system';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import NavigationHeader from '@/components/common/header/general';
import Loading from '@/components/core-ui/loading';
import Pagination from '@/components/core-ui/pagination';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import PostFilters from '@/modules/post/components/post-filter';
import { PostList } from '@/modules/post/components/post-list';
import { usePost } from '@/modules/post/hooks/use-post';
import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = StackScreenProps<AuthenticatedParamList, 'Post'>;

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
