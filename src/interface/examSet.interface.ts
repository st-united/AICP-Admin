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
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}
