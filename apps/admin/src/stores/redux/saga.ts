import { all, fork } from 'redux-saga/effects';

import categoriesWatcher from '@/modules/categories/states/categories.saga';
import filesWatcher from '@/modules/files/states/files.saga';
import postsWatcher from '@/modules/posts/states/posts.saga';
import productsWatcher from '@/modules/products/states/products.saga';
import usersWatcher from '@/modules/users/states/users.saga';

export default function* root() {
  yield all([
    fork(usersWatcher),
    fork(postsWatcher),
    fork(filesWatcher),
    fork(categoriesWatcher),
    fork(productsWatcher)
  ]);
}
