import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@app/constants';
import { MentorCreateDto } from '@app/interface/mentor.interface';
import { createMentorApi } from '@app/services';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

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
