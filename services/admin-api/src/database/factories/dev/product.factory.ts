import { faker } from '@faker-js/faker';

import { toSlug } from '@/common/utils/string.util';

import { IProductFactory } from '@/database/interface';

import { PRODUCT_STATUS } from '@/modules/products/constants/product.constant';

import { userFactory } from '../user.factory';

const statuses = Object.values(PRODUCT_STATUS);

export function createRandomProduct(): IProductFactory {
  const name = faker.lorem.words(10);

  return {
    id: faker.string.uuid(),
    name,
    slug: toSlug(name),
    createdAt: faker.date.past(),
    body: faker.lorem.words(150),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    creator: userFactory[0]
  };
}

export const productFactory = faker.helpers.multiple(createRandomProduct, {
  count: 30
});
