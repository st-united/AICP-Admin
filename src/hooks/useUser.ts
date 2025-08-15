import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { NAVIGATE_URL, QUERY_KEY } from '@app/constants';
import {
  GetUsersParams,
  UserDetail,
  ChangePassword,
  UpdateForgotPassword,
} from '@app/interface/user.interface';
import {
  createUser,
  deleteUserAPI,
  getUserByIdAPI,
  getUsersAPI,
  updateUser,
  forgotPasswordApi,
  changePasswordApi,
  updateForgotPasswordApi,
  getUserStatsApi,
  getUserDetailBeforeInterview,
} from '@app/services';
import {
  openNotificationWithIcon,
  NotificationTypeEnum,
} from '@app/services/notification/notificationService';

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation(
    async (formData: FormData) => {
      const response = await createUser(formData);
      return response.data;
    },
    {
      onSuccess({ message }) {
        navigate(NAVIGATE_URL.USER);
      },
    },
  );
};

export const useGetUsers = (params: GetUsersParams) =>
  useQuery(
    [
      QUERY_KEY.USERS,
      params.search,
      params.status,
      params.page,
      params.take,
      params.order,
      params.orderBy,
      params.province,
      params.job,
      params.startDate,
      params.endDate,
    ],
    async () => {
      const { data } = await getUsersAPI(params);
      return data;
    },
    {
      enabled: false,
      keepPreviousData: true,
      cacheTime: 0,
    },
  );

export const useGetUserStats = () => {
  return useQuery(
    [QUERY_KEY.USERS, QUERY_KEY.USER_STATS],
    async () => {
      const { data } = await getUserStatsApi();
      return data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetUserById = (id: number) =>
  useQuery([QUERY_KEY.USERS, id], async () => {
    const { data } = await getUserByIdAPI(id);
    return data.data;
  });

export const useGetUserDetail = (id: string) =>
  useQuery(
    [QUERY_KEY.USER, id],
    async () => {
      const { data } = await getUserDetailBeforeInterview(id);
      return data.data;
    },
    {
      enabled: !!id,
    },
  );

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async (user: UserDetail) => {
      const response = await updateUser(user);
      return response.data;
    },
    {
      onSuccess({ message }) {
        queryClient.refetchQueries([QUERY_KEY.USERS]);
        queryClient.refetchQueries([QUERY_KEY.PROFILE]);
        navigate(NAVIGATE_URL.USER);
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(async (id: number) => {
    const response = await deleteUserAPI(id);
    return response.data;
  });
};

export const useForgotPassword = () => {
  const { t } = useTranslation();
  return useMutation(
    async (email: string) => {
      const response = await forgotPasswordApi(email);
      return response.data;
    },
    {
      onSuccess() {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('FORGOT_PASSWORD.SUCCESS'));
      },
      onError() {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('FORGOT_PASSWORD.NOT_FOUND'));
      },
    },
  );
};

export const useChangeNewPassword = () => {
  return useMutation(async (changePassword: ChangePassword) => {
    const response = await changePasswordApi(changePassword);
    return response.data;
  });
};

export const useUpdateForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation(
    async (payload: UpdateForgotPassword) => {
      const response = await updateForgotPasswordApi(payload);
      return response.data;
    },
    {
      onSuccess() {
        openNotificationWithIcon(NotificationTypeEnum.SUCCESS, t('MODAL.SUGGESTION_COPY_PASSWORD'));
        navigate('/login', { replace: true });
      },
      onError() {
        openNotificationWithIcon(NotificationTypeEnum.ERROR, t('FORGOT_PASSWORD.EXPIRED'));
      },
    },
  );
};
