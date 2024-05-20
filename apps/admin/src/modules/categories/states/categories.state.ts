import { bindActionCreators } from 'redux';

import { useAppDispatch, useAppSelector } from '@/stores/redux/store';

import { getNode, selectAll } from './categories.selectors';
import slice from './categories.slice';

export function useCategoriesState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getNode);
  const items = useAppSelector(selectAll);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return { dispatch, ...state, items, ...actionCreators };
}
