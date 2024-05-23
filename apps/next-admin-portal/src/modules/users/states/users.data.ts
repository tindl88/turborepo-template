import { EntityId } from '@reduxjs/toolkit';

import { UserEntity } from '../interfaces/users.interface';

const userItems: UserEntity[] = [];

const entities: { [key: string]: UserEntity } = {};

userItems.forEach(item => (entities[item.id] = { ...item }));

const ids = Object.keys(entities) as EntityId[];

export const selected: EntityId[] = [];

export const usersData = { ids, entities, selected };
