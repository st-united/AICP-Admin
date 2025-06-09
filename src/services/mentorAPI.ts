import axios from 'axios';

import { API_URL } from '@app/constants';
import { MentorCreateDto, MentorUpdateDto } from '@app/interface/mentor.interface';
import { GetMentorsParams } from '@app/interface/user.interface';

export const getMentorsApi = (params: GetMentorsParams) =>
  axios.get(API_URL.MENTOR, {
    params,
  });

export const getMentorByIdApi = (mentorId: string) => axios.get(`${API_URL.MENTOR}/${mentorId}`);

export const createMentorApi = (mentor: MentorCreateDto) => axios.post(API_URL.MENTOR, mentor);

export const updateMentorApi = (mentorDto: MentorUpdateDto) => {
  const { id, ...data } = mentorDto;
  return axios.patch(`${API_URL.MENTOR}/${id}`, data);
};

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
