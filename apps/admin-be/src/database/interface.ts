import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { POST_STATUS } from '@/modules/posts/constants/post.constant';
import { PRODUCT_STATUS } from '@/modules/products/constants/product.constant';
import { USER_GENDER, USER_ROLE, USER_STATUS } from '@/modules/users/constants/user.constant';

export interface IUserFactory {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  password?: string;
  emailVerified?: boolean;
  locale?: string;
  providerAccountId?: string;
  provider?: AUTH_PROVIDER;
  authType?: AUTH_TYPE;
  gender?: USER_GENDER;
  status?: USER_STATUS;
  role?: USER_ROLE;
}

export interface IProductFactory {
  id: string;
  name: string;
  slug: string;
  body: string;
  status: PRODUCT_STATUS;
  creator: IUserFactory;
  createdAt: Date;
}

export interface IPostFactory {
  id: string;
  name: string;
  slug: string;
  description: string;
  body: string;
  status: POST_STATUS;
  creator: IUserFactory;
  createdAt: Date;
}
