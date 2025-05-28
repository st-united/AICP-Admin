import { GetListParams } from './common.interface';

export interface UserColumns {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  province: string;
  job: string;
  status: boolean;
  createdAt: Date;
  updatedAt?: Date;
  avatarUrl?: string;
  country?: string;
  provider?: string;
  referralCode?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatarUrl: string;
  permissions: string[];
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  identityId: string;
  avatar: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateForgotPassword {
  token: string | null;
  password: string;
}

export interface UserCreateParams {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  identityId: string;
  dateOfBirth: string;
}

export interface AssignPermissionParams {
  id: number;
  role: number;
  permissions: number[];
}

export interface GetUsersParams extends GetListParams {
  status: boolean | null;
  province: string | null;
  job: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export interface Users {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface MentorColumns {
  id: number;
  isActive: boolean;
  createdAt: string;
  user: Users;
  completedCount: string;
  upcomingCount: string;
}

export interface MenteeColumns {
  id: number;
  fullName: string;
  email: string;
  scheduledAt: string;
}

export interface GetMentorsParams extends GetListParams {
  fullName?: string;
  isActive?: boolean;
}
