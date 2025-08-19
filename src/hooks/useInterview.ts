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
