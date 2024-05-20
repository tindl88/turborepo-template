import { EntityId } from '@reduxjs/toolkit';

import { FileEntity } from '../interfaces/files.interface';

const fileItems: FileEntity[] = [];

const entities: { [key: string]: FileEntity } = {};

fileItems.forEach(item => (entities[item.id] = { ...item }));

const ids = Object.keys(entities) as EntityId[];

export const selected: EntityId[] = [];

export const filesData = { ids, entities, selected };
