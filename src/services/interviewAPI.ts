import axios from 'axios';

import { API_URL } from '@app/constants';
import { InterviewRequestsParams } from '@app/interface/interview.interface';

export const getInterviewRequestsApi = (params: InterviewRequestsParams) =>
  axios.get(API_URL.INTERVIEW, {
    params,
  });
