import { Dayjs } from 'dayjs';
export interface InterviewRegistrationColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  date: string;
}

export interface InterviewRegistrationData {
  data: InterviewRegistrationColumns[];
  total: number;
  totalPages: number;
}

export interface InterviewRegistrationFilter {
  search: string;
  levelFilter: string[];
  dateFilter: [Dayjs, Dayjs] | null;
  page: number;
  limit: number;
}
