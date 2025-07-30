import dayjs from 'dayjs';

export const formatDateTime = (dateString: string, format = 'DD/MM/YYYY HH:mm A'): string => {
  return dayjs(dateString).format(format);
};
