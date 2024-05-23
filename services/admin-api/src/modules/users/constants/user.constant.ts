export const USER_GET_FIELDS =
  'user.id user.avatar user.name user.email user.phoneNumber user.role user.lastLogin user.status user.createdAt'.split(
    ' '
  );

export enum USER_GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum USER_ROLE {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user'
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  BLOCKED = 'blocked',
  NOT_VERIFIED = 'not_verified'
}
