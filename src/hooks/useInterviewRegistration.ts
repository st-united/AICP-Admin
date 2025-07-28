import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { GetInterviewRegistrationParams } from '@app/interface/interviewRegistration.interface';
// import { getInterviewRegistrationsApi } from '@app/services';

export const useGetInterviewRegistration = (params: GetInterviewRegistrationParams) => {
  return useQuery(
    [
      QUERY_KEY.INTERVIEW_REGISTRATION,
      params.page,
      params.take,
      params.keyword,
      params.level,
      params.date,
    ],
    async () => {
      // const { data } = await getInterviewRegistrationsApi(params);
      // return data;
    },
    { keepPreviousData: true },
  );
};
