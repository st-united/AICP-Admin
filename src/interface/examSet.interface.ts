import { t } from 'i18next';

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
  { value: ALL_STATUS_VALUE, label: t('TEST_LIST.STATUS.ALL') },
  { value: TestStatus.DRAFT, label: t('TEST_LIST.STATUS.DRAFT') },
  { value: TestStatus.PUBLISHED, label: t('TEST_LIST.STATUS.PUBLISHED') },
  { value: TestStatus.ACTIVE, label: t('TEST_LIST.STATUS.ACTIVE') },
  { value: TestStatus.INACTIVE, label: t('TEST_LIST.STATUS.INACTIVE') },
  { value: TestStatus.ARCHIVED, label: t('TEST_LIST.STATUS.ARCHIVED') },
];

export const statusLabels: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: t('TEST_LIST.STATUS.DRAFT'),
  [TestStatus.PUBLISHED]: t('TEST_LIST.STATUS.PUBLISHED'),
  [TestStatus.ACTIVE]: t('TEST_LIST.STATUS.ACTIVE'),
  [TestStatus.INACTIVE]: t('TEST_LIST.STATUS.INACTIVE'),
  [TestStatus.ARCHIVED]: t('TEST_LIST.STATUS.ARCHIVED'),
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
