export const POST_GET_FIELDS =
  'post.id post.name post.slug post.description post.body post.status post.cover post.createdAt user.id user.name user.email postFile.fileId postFile.position image.id image.uniqueName category.id category.name'.split(
    ' '
  );

export enum POST_STATUS {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted'
}
