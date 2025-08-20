import { useMutation, useQuery } from '@tanstack/react-query';

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
  return useQuery({
    queryKey: [QUERY_KEY.INTERVIEW, params],
    queryFn: async () => {
      const { data } = await getInterviewRequestsApi(params);
      return data.data;
    },
    keepPreviousData: true,
  });
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
