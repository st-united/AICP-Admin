import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { MentorCreateDto, MentorUpdateDto } from '@app/interface/mentor.interface';
import { GetMentorsParams, MentorColumns } from '@app/interface/user.interface';
import {
  createMentorApi,
  getMenTeeFromMentorApi,
  getMentorByIdApi,
  getMentorsApi,
  getMentorStatsApi,
  updateMentorApi,
  activateMentorAccountApi,
  deactivateMentorAccountApi,
  mentorSelfActivationApi,
} from '@app/services';
import {
  openNotificationWithIcon,
  NotificationTypeEnum,
} from '@app/services/notification/notificationService';

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
    { keepPreviousData: true },
  );
};

export const useGetMentorById = (mentorId: string): UseQueryResult<MentorColumns> => {
  return useQuery([QUERY_KEY.MENTOR, mentorId], async () => {
    const { data } = await getMentorByIdApi(mentorId);
    return data.data;
  });
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

export const useCreateMentor = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (mentor: MentorCreateDto) => {
      const { data } = await createMentorApi(mentor);
      return data;
    },
    {
      onSuccess({ message }) {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        queryClient.refetchQueries([QUERY_KEY.MENTOR]);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
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

export const useUpdateMentor = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (mentor: MentorUpdateDto) => {
      const { id, ...rest } = mentor;
      const { data } = await updateMentorApi(mentor);
      return data;
    },
    {
      onSuccess({ message }) {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
        queryClient.refetchQueries([QUERY_KEY.MENTOR]);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
export const useActivateMentorByLink = () => {
  return useMutation(
    async (token: string) => {
      const { data } = await mentorSelfActivationApi(token);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
      },
      onError: ({ response }) => {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
