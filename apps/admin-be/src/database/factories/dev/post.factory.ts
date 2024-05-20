import { faker } from '@faker-js/faker';

import { toSlug } from '@/common/utils/string.util';

import { IPostFactory } from '@/database/interface';

import { POST_STATUS } from '@/modules/posts/constants/post.constant';

import { userFactory } from '../user.factory';

const statuses = Object.values(POST_STATUS);

export function createRandomPost(): IPostFactory {
  const name = faker.lorem.words(10);

  return {
    id: faker.string.uuid(),
    name,
    slug: toSlug(name),
    description: faker.lorem.words(30),
    createdAt: faker.date.past(),
    body: faker.lorem.words(150),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    creator: userFactory[0]
  };
}

export const postFactory = faker.helpers.multiple(createRandomPost, {
  count: 30
});
