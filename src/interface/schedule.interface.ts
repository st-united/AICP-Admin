export interface ScheduleColumns {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nameExamSet: string;
  level: string;
  interviewDate: string;
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
  levels?: string[];
  status?: string[];
  dateStart?: string | null;
  dateEnd?: string | null;
  page: number;
  limit: number;
}
