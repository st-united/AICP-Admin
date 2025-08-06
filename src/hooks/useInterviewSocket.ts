import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { QUERY_KEY, socket } from '@app/constants';
import {
  InterviewColumns,
  InterviewData,
  InterviewFilter,
  MentorCreateScheduleDto,
} from '@app/interface/interview.interface';
import { createMentorScheduleApi } from '@app/services';
import {
  openNotificationWithIcon,
  NotificationTypeEnum,
} from '@app/services/notification/notificationService';

export const useInterviewSocket = ({
  search,
  levelFilter,
  dateFilter,
  page,
  limit,
}: InterviewFilter) => {
  const [data, setData] = useState<InterviewData | null>(null);
  const [tableData, setTableData] = useState<InterviewColumns[]>([]);

  useEffect(() => {
    const handleUserBookings = (response: { data?: InterviewData }) => {
      const payload = response?.data;
      if (!payload) return;

      setData({
        data: payload.data || [],
        total: payload.total || 0,
        totalPages: payload.totalPages || 1,
      });

      if (!tableData.length && Array.isArray(payload.data)) {
        setTableData(payload.data);
      }
    };

    socket.on('userBookings', handleUserBookings);
    return () => {
      socket.off('userBookings', handleUserBookings);
    };
  }, [tableData.length]);

  useEffect(() => {
    const payload = {
      name: search || undefined,
      level: levelFilter.length ? levelFilter : undefined,
      dateStart: dateFilter?.[0]?.toISOString(),
      dateEnd: dateFilter?.[1]?.toISOString(),
      page: page,
      limit: limit,
    };

    if (socket.connected) {
      socket.emit('getUserBookings', payload);
    }
  }, [search, levelFilter, dateFilter, page, limit]);

  return { data, tableData };
};

export const useCreateMentorSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (mentor: MentorCreateScheduleDto) => {
      const { data } = await createMentorScheduleApi(mentor);
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
