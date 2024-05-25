import {all, fork} from 'redux-saga/effects';

import authWatcher from '@/modules/auth/states/auth.saga';

export default function* root() {
  yield all([fork(authWatcher)]);
}
