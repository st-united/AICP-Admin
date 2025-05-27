import axios from 'axios';

import { API_URL } from '@app/constants';
import { MentorCreateDto } from '@app/interface/mentor.interface';
import { GetMentorsParams } from '@app/interface/user.interface';

export const getMentorsApi = (params: GetMentorsParams) =>
  axios.get(API_URL.MENTOR, {
    params,
  });

export const createMentorApi = (mentor: MentorCreateDto) => axios.post(API_URL.MENTOR, mentor);

export const getMentorStatsApi = () => axios.get(API_URL.MENTOR_STATS);

export const getMenTeeFromMentorApi = (mentorId: string) =>
  axios.get(API_URL.MENTEES_FROM_MENTOR, {
    params: {
      mentorId,
    },
  });
