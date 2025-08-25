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
