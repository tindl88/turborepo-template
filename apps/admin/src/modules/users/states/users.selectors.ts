import { createSelector, EntityId } from '@reduxjs/toolkit';

import { UserEntity } from '../interfaces/users.interface';

import { RootState } from '@/stores/redux/store';

import slice from './users.slice';

export const getNode = (state: RootState) => state[slice.name];
export const selectFilter = createSelector([getNode], node => node.filter);
export const selectOne = createSelector([getNode, (_, id: EntityId) => id], (node, id) => node.entities[id]);
export const selectAllIds = createSelector([getNode], node => node.ids);
export const selectAllEntities = createSelector([getNode], node => node.entities);
export const selectAll = createSelector(
  [selectAllIds, selectAllEntities],
  (ids, entities) => ids.map(id => entities[id]) as UserEntity[]
);
