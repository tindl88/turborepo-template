export const AUDIT_LOG_GET_FIELDS =
  'audit.id audit.tableName audit.recordId audit.action audit.oldValue audit.newValue audit.createdAt user.id user.name user.email'.split(
    ' '
  );

export enum AUDIT_LOG_TABLE_NAME {
  USER = 'users',
  FILE = 'files',
  POST = 'posts',
  PRODUCT = 'product',
  CATEGORIE = 'categories'
}

export enum AUDIT_LOG_HTTP_METHOD {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}
