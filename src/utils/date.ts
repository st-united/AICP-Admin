import dayjs from 'dayjs';

export const formatDate = (dateString: string, format = 'DD/MM/YYYY'): string => {
  return dayjs(dateString).format(format);
};
