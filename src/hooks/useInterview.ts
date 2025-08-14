import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { InterviewRequestsParams } from '@app/interface/interview.interface';
import { getInterviewRequestsApi } from '@app/services';

export const useGetInterviewRequests = (params: InterviewRequestsParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.INTERVIEW, params],
    queryFn: async () => {
      const { data } = await getInterviewRequestsApi(params);
      return data.data;
    },
    keepPreviousData: true,
  });
};

export const useGetInterviewRequestsForFilter = () => {
  return useQuery({
    queryKey: [QUERY_KEY.INTERVIEW, { page: 1, limit: 10000 }],
    queryFn: async () => {
      const { data } = await getInterviewRequestsApi({
        page: 1,
        limit: 10000,
      });
      return data.data;
    },
    keepPreviousData: true,
  });
};
