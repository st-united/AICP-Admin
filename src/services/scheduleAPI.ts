import axios from 'axios';

import { API_URL } from '@app/constants';
import { GetScheduleParams } from '@app/interface/schedule.interface';

export const getScheduleAPI = async (params: GetScheduleParams) =>
  await axios.get(API_URL.MY_SCHEDULE, {
    params,
    paramsSerializer: (p) => {
      return Object.keys(p)
        .filter((key) => p[key] !== undefined && p[key] !== null)
        .map((key) => {
          const value = p[key];

          if (Array.isArray(value)) {
            return value
              .map((v) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`;
              })
              .join('&');
          }

          return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        })
        .join('&');
    },
  });
