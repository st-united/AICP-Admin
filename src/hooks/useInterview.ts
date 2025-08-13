import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { InterviewRequestsParams } from '@app/interface/interview.interface';
import { getInterviewRequestsApi } from '@app/services';

export const useGetInterviewRequests = (params: InterviewRequestsParams) => {
  return useQuery(
    [
      QUERY_KEY.INTERVIEW,
      params.name,
      params.level,
      params.dateStart,
      params.dateEnd,
      params.limit,
      params.page,
    ],
    async () => {
      const { data } = await getInterviewRequestsApi(params);
      return data.data;
    },
    { keepPreviousData: true },
  );
};

export const useGetInterviewRequestsForFilter = () => {
  return useQuery(
    [QUERY_KEY.INTERVIEW],
    async () => {
      const { data } = await getInterviewRequestsApi({
        page: 1,
        limit: 10000,
      });
      return data.data;
    },
    { keepPreviousData: true },
  );
};
