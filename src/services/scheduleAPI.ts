import axios from 'axios';

import { API_URL } from '@app/constants';
import { GetScheduleParams } from '@app/interface/schedule.interface';

export const getScheduleAPI = async (params: GetScheduleParams) =>
  await axios.get(API_URL.MY_SCHEDULE, { params });
