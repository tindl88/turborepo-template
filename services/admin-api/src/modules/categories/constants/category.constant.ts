export const CATEGORY_GET_FIELDS =
  'category.id category.name category.type category.parent category.status category.createdAt parent.id parent.name'.split(
    ' '
  );

export enum CATEGORY_STATUS {
  VISIBLED = 'visibled',
  DELETED = 'deleted'
}

export enum CATEGORY_TYPE {
  FILE = 'file',
  PRODUCT = 'product',
  POST = 'post'
}
