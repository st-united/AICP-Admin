import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { GetMentorsParams } from '@app/interface/user.interface';
import {
  activateMentorAccountApi,
  deactivateMentorAccountApi,
  getMenTeeFromMentorApi,
  getMentorsApi,
  getMentorStatsApi,
} from '@app/services';

export const useGetMentor = (params: GetMentorsParams) => {
  return useQuery(
    [
      QUERY_KEY.MENTOR,
      params.page,
      params.take,
      params.search,
      params.isActive,
      params.orderBy,
      params.order,
    ],
    async () => {
      const { data } = await getMentorsApi(params);
      return data;
    },
    {
      // keepPreviousData: true,
      // refetchOnWindowFocus: false,
    },
  );
};

export const useGetMentorStats = () => {
  return useQuery(
    [QUERY_KEY.MENTOR, 'stats'],
    async () => {
      const { data } = await getMentorStatsApi();
      return data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetMenteesMentor = (mentorId: string, enabled = true) => {
  return useQuery(
    [QUERY_KEY.MENTOR, mentorId],
    async () => {
      const { data } = await getMenTeeFromMentorApi(mentorId);
      return data;
    },
    {
      enabled: !!mentorId && enabled,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
};

export const useActivateMentorAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const response = await activateMentorAccountApi(id);
      return response;
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries([QUERY_KEY.MENTOR]);
      },
    },
  );
};

export const useDeactivateMentorAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const response = await deactivateMentorAccountApi(id);
      return response;
    },
    {
      onSuccess: async (data) => {
        await queryClient.refetchQueries([QUERY_KEY.MENTOR]);
      },
    },
  );
};
