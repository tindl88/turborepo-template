import { useQuery } from '@tanstack/react-query';

import UserApi from '../api/users.api';

type UseUsersProps = {
  isEdit: boolean;
  userId: string;
};

function useUsers({ isEdit, userId }: UseUsersProps) {
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
    enabled: isEdit,
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
