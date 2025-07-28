import axios from 'axios';

import { API_URL } from '@app/constants';
import { GetInterviewRegistrationParams } from '@app/interface/interviewRegistration.interface';

export const getInterviewRegistrationsApi = (params: GetInterviewRegistrationParams) =>
  axios.get(API_URL.INTERVIEW_REGISTRATION, { params });
