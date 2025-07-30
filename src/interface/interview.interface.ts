import { Dayjs } from 'dayjs';
export interface InterviewColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  date: string;
  timeSlost: string;
}

export interface InterviewData {
  data: InterviewColumns[];
  total: number;
  totalPages: number;
}

export interface InterviewFilter {
  search: string;
  levelFilter: string[];
  dateFilter: [Dayjs, Dayjs] | null;
  page: number;
  limit: number;
}
