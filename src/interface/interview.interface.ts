import { Dayjs } from 'dayjs';

import { TimeSlotKey } from '@app/constants';
export interface InterviewColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  date: string;
  timeSlost: TimeSlotKey;
  examId: string;
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

export interface MentorCreateScheduleDto {
  interviewRequestIds: string[];
}
