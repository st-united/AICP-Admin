export const STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'Chưa diễn ra',
  REJECTED: 'REJECTED',
  CANCELLED: 'Không tham gia',
  COMPLETED: 'Đã diễn ra',
};

export type StatusKey = keyof typeof STATUS;
