import { TimeSlotKey } from '@app/constants';
export interface InterviewColumns {
  id: number;
  name: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  date: string;
  timeSlots: TimeSlotKey;
  examId: string;
}

export interface InterviewRequestsParams {
  name?: string;
  levels?: string[];
  dateStart?: string | null;
  dateEnd?: string | null;
  page: number;
  limit: number;
}
