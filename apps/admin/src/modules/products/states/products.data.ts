import { EntityId } from '@reduxjs/toolkit';

import { ProductEntity } from '../interfaces/products.interface';

const productItems: ProductEntity[] = [];

const entities: { [key: string]: ProductEntity } = {};

productItems.forEach(item => (entities[item.id] = { ...item }));

const ids = Object.keys(entities) as EntityId[];

export const selected: EntityId[] = [];

export const productsData = { ids, entities, selected };
