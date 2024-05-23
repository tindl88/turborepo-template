import { EntityId } from '@reduxjs/toolkit';

import { PostEntity } from '../interfaces/posts.interface';

const postItems: PostEntity[] = [];

const entities: { [key: string]: PostEntity } = {};

postItems.forEach(item => (entities[item.id] = { ...item }));

const ids = Object.keys(entities) as EntityId[];

export const selected: EntityId[] = [];

export const postsData = { ids, entities, selected };
