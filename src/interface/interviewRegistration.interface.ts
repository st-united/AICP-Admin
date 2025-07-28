import { GetListParams } from './common.interface';

export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Exam {
  assessmentType: string;
  sfiaLevel: string;
}

export interface InterviewRegistrationColumns {
  id: number;
  user: User;
  exam: Exam;
  scheduledAt: string;
}

export interface GetInterviewRegistrationParams extends GetListParams {
  keyword?: string;
  level?: string;
  date?: string;
}
