import { useQuery } from '@tanstack/react-query';

import UserApi from '../api/users.api';

type UseUsersProps = {
  userId: string;
};

function useUsers({ userId }: UseUsersProps) {
  const {
    data: user,
    isFetched: isUserFetched,
    isFetching: isUserFetching
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const userResp = await UserApi.read(userId);

      return userResp.data.data;
    },
    staleTime: 0,
    gcTime: 0
  });

  return {
    isFetched: isUserFetched,
    isFetching: isUserFetching,
    user
  };
}

export default useUsers;
