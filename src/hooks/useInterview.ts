import { useQuery, useMutation } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import {
  InterviewRequestsParams,
  MentorCreateScheduleDto,
} from '@app/interface/interview.interface';
import { getInterviewRequestsApi, createMentorScheduleApi } from '@app/services';
import {
  openNotificationWithIcon,
  NotificationTypeEnum,
} from '@app/services/notification/notificationService';

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

export const useCreateMentorSchedule = () => {
  return useMutation(
    async (mentor: MentorCreateScheduleDto) => {
      const { data } = await createMentorScheduleApi(mentor);
      return data;
    },
    {
      onSuccess({ message }) {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, message);
      },
      onError({ response }) {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, response.data.message);
      },
    },
  );
};
