import axios from 'axios';

import { API_URL } from '@app/constants';
import { InterviewRequestsParams } from '@app/interface/interview.interface';

export const getInterviewRequestsApi = (params: InterviewRequestsParams) =>
  axios.get(API_URL.INTERVIEW, {
    params,
    paramsSerializer: (p) => {
      return Object.keys(p)
        .filter((key) => p[key] !== undefined && p[key] !== null)
        .map((key) => {
          const value = p[key];

          if (Array.isArray(value)) {
            const arr = value.length === 1 ? [...value, value[0]] : value;

            return arr
              .map((v) => {
                if (key === 'dateStart' || key === 'dateEnd') {
                  return `${encodeURIComponent(key)}=${v}`;
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`;
              })
              .join('&');
          }

          if (key === 'dateStart' || key === 'dateEnd') {
            return `${encodeURIComponent(key)}=${value}`;
          }

          return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        })
        .join('&');
    },
  });
