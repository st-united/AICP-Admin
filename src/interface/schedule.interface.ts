import { Dayjs } from 'dayjs';
export interface ScheduleColumns {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  date: string;
  timeSlot: string;
  status: string;
}

export interface ScheduleData {
  data: ScheduleColumns[];
  total: number;
  totalPages: number;
}

export interface GetScheduleParams {
  keyword?: string;
  level?: string[];
  status?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
  page: number;
  limit: number;
}
