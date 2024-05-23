import { bindActionCreators } from 'redux';

import { useAppDispatch, useAppSelector } from '@/stores/redux/store';

import { getNode, selectAll } from './files.selectors';
import slice from './files.slice';

export function useFilesState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getNode);
  const items = useAppSelector(selectAll);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return { dispatch, ...state, items, ...actionCreators };
}
