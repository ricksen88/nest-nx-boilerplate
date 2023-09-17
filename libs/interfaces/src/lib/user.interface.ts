export enum UserRole {
  Admin = 'admin',
  User = 'user',
  MainAdmin = 'main admin',
}

export interface IUser {
  id?: string;
  password: string;
  email: string;
  emailToken?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  deleted: boolean;
  approved: boolean;
  rejected: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
  emailApproved: boolean;
  restoreToken: string;
  restoreExpires: Date;
}
