import axios from 'axios';

import { API_URL } from '@app/constants';
import { GetMentorsParams } from '@app/interface/user.interface';

export const getMentorsApi = (params: GetMentorsParams) =>
  axios.get(API_URL.GET_MENTOR, {
    params,
  });

export const getMentorStatsApi = () => axios.get(API_URL.GET_MENTOR_STATS);

export const getMenTeeFromMentorApi = (mentorId: string) =>
  axios.get(API_URL.GET_MENTEES_FROM_MENTOR, {
    params: {
      mentorId,
    },
  });
