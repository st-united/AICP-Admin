import axios from 'axios';

import { API_URL } from '@app/constants';
import { GetMentorsParams } from '@app/interface/user.interface';

export const getMentorsApi = (params: GetMentorsParams) =>
  axios.get(API_URL.MENTOR, {
    params,
  });

export const getMentorStatsApi = () => axios.get(API_URL.MENTOR_STATS);

export const getMenTeeFromMentorApi = (mentorId: string) =>
  axios.get(API_URL.MENTEES_FROM_MENTOR, {
    params: {
      mentorId,
    },
  });

export const activateMentorAccountApi = async (id: number) => {
  await axios.patch(`${API_URL.MENTOR_ACTIVE}/${id}`);
};

export const deactivateMentorAccountApi = async (id: number) => {
  await axios.delete(`${API_URL.MENTOR_DEACTIVATE}/${id}`);
};
