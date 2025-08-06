import axios from 'axios';

import { API_URL } from '@app/constants';
import { MentorCreateScheduleDto } from '@app/interface/interview.interface';

export const createMentorScheduleApi = (mentor: MentorCreateScheduleDto) =>
  axios.post(API_URL.INTERVIEW_SCHEDULE, mentor);
