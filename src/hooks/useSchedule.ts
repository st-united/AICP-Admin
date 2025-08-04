import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { GetScheduleParams } from '@app/interface/schedule.interface';
import { getScheduleAPI } from '@app/services';

export const useGetSchedule = (params: GetScheduleParams) => {
  return useQuery(
    [
      QUERY_KEY.SCHEDULE,
      params.keyword,
      params.level,
      params.status,
      params.startDate,
      params.endDate,
      params.limit,
      params.page,
    ],
    async () => {
      const { data } = await getScheduleAPI(params);
      console.log(data.data);
      return data.data;
    },
    { keepPreviousData: true },
  );
};

export const useGetAllSchedule = () => {
  return useQuery(
    [QUERY_KEY.SCHEDULE],
    async () => {
      const { data } = await getScheduleAPI({
        page: 1,
        limit: 10000,
      });
      console.log(data);
      return data.data;
    },
    { keepPreviousData: true },
  );
};
