import { bindActionCreators } from 'redux';

import { useAppDispatch, useAppSelector } from '@/stores/redux/store';

import { getNode, selectAll } from './users.selectors';
import slice from './users.slice';

export function useUsersState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getNode);
  const items = useAppSelector(selectAll);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return { dispatch, ...state, items, ...actionCreators };
}
