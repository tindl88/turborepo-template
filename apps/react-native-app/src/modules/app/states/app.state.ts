import {bindActionCreators} from 'redux';

import {useAppDispatch, useAppSelector} from '@/common/redux/store';

import slice from './app.slice';

export function useAppState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(store => store.app);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return {dispatch, ...state, ...actionCreators};
}
