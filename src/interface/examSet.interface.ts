import { ALL_STATUS_VALUE } from '@app/constants/examset';

export interface Test {
  id: string;
  name: string;
  description: string;
  urlImage: string;
  startDate: string;
  endDate: string;
  assessmentType: string;
  isActive: boolean;
  createdAt: string;
  status: TestStatus;
}

export interface TestCardProps {
  test: Test;
  onViewDetails: (id: string) => void;
}

export enum TestStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const statusOptions = [
  { value: ALL_STATUS_VALUE, label: 'Tất cả trạng thái' },
  { value: TestStatus.DRAFT, label: 'Bản nháp' },
  { value: TestStatus.PUBLISHED, label: 'Đã xuất bản' },
  { value: TestStatus.ACTIVE, label: 'Đang sử dụng' },
  { value: TestStatus.INACTIVE, label: 'Ngưng sử dụng' },
  { value: TestStatus.ARCHIVED, label: 'Đã lưu trữ' },
];

export const statusLabels: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'Bản nháp',
  [TestStatus.PUBLISHED]: 'Đã xuất bản',
  [TestStatus.ACTIVE]: 'Đang sử dụng',
  [TestStatus.INACTIVE]: 'Ngưng sử dụng',
  [TestStatus.ARCHIVED]: 'Đã lưu trữ',
};

export const statusColors: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'default',
  [TestStatus.PUBLISHED]: 'success',
  [TestStatus.ACTIVE]: 'processing',
  [TestStatus.INACTIVE]: 'warning',
  [TestStatus.ARCHIVED]: 'error',
};

export const statusStyleClasses: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'border-[#616161] bg-[#E5E5E5]',
  [TestStatus.PUBLISHED]: 'border-[#5630E3] bg-[#ECE7FF]',
  [TestStatus.ACTIVE]: 'border-[#307AE3] bg-[#E2EEFF]',
  [TestStatus.INACTIVE]: 'border-[#CA8617] bg-[#FDE6E6]',
  [TestStatus.ARCHIVED]: 'border-[#B40000] bg-[#F8ECD9]',
};
