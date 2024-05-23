import { EntityId } from '@reduxjs/toolkit';

import { CategoryEntity } from '../interfaces/categories.interface';

const categoryItems: CategoryEntity[] = [];

const entities: { [key: string]: CategoryEntity } = {};

categoryItems.forEach(item => (entities[item.id] = { ...item }));

const ids = Object.keys(entities) as EntityId[];

export const selected: EntityId[] = [];

export const categoriesData = { ids, entities, selected };
