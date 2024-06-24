import React from 'react';
import { useTranslation } from 'react-i18next';
import { ds } from '~react-native-design-system';

import Loading from '@/components/core-ui/loading';
import Pagination from '@/components/core-ui/pagination';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { TravelExploreStackProps } from '@/modules/navigation/interfaces/navigation.interface';
import PostFilters from '@/modules/post/components/post-filter';
import { PostList } from '@/modules/post/components/post-list';
import { usePost } from '@/modules/post/hooks/use-post';

import { getHeaderTitle } from '@/utils/header-title.util';

function TravelPlacesScreen({ route }: TravelExploreStackProps<'TravelPlaces'>) {
  const { t } = useTranslation();
  const { isLoading, error, data, meta, filter, setFilter } = usePost(route.params);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={t(getHeaderTitle(route.name))} />
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

export default TravelPlacesScreen;
