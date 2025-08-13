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
}

export interface InterviewRequestsParams {
  name?: string;
  level?: string[];
  dateStart?: string | null;
  dateEnd?: string | null;
  page: number;
  limit: number;
}

export interface MentorCreateScheduleDto {
  interviewRequestIds: string[];
}
