import { bindActionCreators } from 'redux';

import { useAppDispatch, useAppSelector } from '@/stores/redux/store';

import slice from './screen.slice';

export function useScreenState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(store => store.screen);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return { dispatch, ...state, ...actionCreators };
}
