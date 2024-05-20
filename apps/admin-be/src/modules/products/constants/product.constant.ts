export const PRODUCT_GET_FIELDS =
  'product.id product.name product.slug product.body product.status product.cover product.createdAt user.id user.name user.email productFile.fileId productFile.position image.id image.uniqueName'.split(
    ' '
  );

export enum PRODUCT_STATUS {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted'
}
