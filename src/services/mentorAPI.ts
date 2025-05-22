import axios from 'axios';

import { API_URL } from '@app/constants';
import { MentorCreateDto } from '@app/interface/mentor.interface';

export const getMentorApi = () => axios.get(API_URL.MENTOR);

export const createMentorApi = (mentor: MentorCreateDto) => axios.post(API_URL.MENTOR, mentor);
