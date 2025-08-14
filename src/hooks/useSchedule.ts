import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { GetScheduleParams } from '@app/interface/schedule.interface';
import { getScheduleAPI } from '@app/services';

export const useGetSchedule = (params: GetScheduleParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.SCHEDULE, params],
    queryFn: async () => {
      const { data } = await getScheduleAPI(params);
      return data.data;
    },
    keepPreviousData: true,
  });
};

export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: [QUERY_KEY.SCHEDULE, { page: 1, limit: 10000 }],
    queryFn: async () => {
      const { data } = await getScheduleAPI({
        page: 1,
        limit: 10000,
      });
      return data.data;
    },
    keepPreviousData: true,
  });
};
