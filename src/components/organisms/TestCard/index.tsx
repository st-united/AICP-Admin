import { Card, Tag, Button } from 'antd';
import { t } from 'i18next';
import { Calendar as CalendarIcon } from 'lucide-react';

import { TestStatus, TestCardProps, Test } from '@app/interface/examSet.interface';

const statusLabels: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'Bản nháp',
  [TestStatus.PUBLISHED]: 'Đã xuất bản',
  [TestStatus.ACTIVE]: 'Đang sử dụng',
  [TestStatus.INACTIVE]: 'Ngưng sử dụng',
  [TestStatus.ARCHIVED]: 'Đã lưu trữ',
};

const statusColors: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'default',
  [TestStatus.PUBLISHED]: 'success',
  [TestStatus.ACTIVE]: 'processing',
  [TestStatus.INACTIVE]: 'warning',
  [TestStatus.ARCHIVED]: 'error',
};

const statusBorderColors: Record<TestStatus, string> = {
  [TestStatus.DRAFT]: 'border-gray-400',
  [TestStatus.PUBLISHED]: 'border-green-500',
  [TestStatus.ACTIVE]: 'border-blue-500',
  [TestStatus.INACTIVE]: 'border-yellow-500',
  [TestStatus.ARCHIVED]: 'border-red-500',
};

export function TestCard({ test, onViewDetails }: TestCardProps) {
  return (
    <Card
      className='h-full flex flex-col justify-between border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[#F6F7F9]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='p-6'>
        <div className='relative h-40 overflow-hidden rounded-xl'>
          {test.urlImage && (
            <img src={test.urlImage} alt='Test' className='w-full h-full object-cover' />
          )}
        </div>

        <div className='flex items-center justify-between mb-2 mt-4'>
          <h3 className='font-semibold text-base sm:text-lg text-[#000000] line-clamp-1'>
            {test.name}
          </h3>
          <Tag
            color={statusColors[test.status]}
            className={`font-medium px-3 py-1 border ${statusBorderColors[test.status]}`}
          >
            {statusLabels[test.status]}
          </Tag>
        </div>

        <p className='text-[#33394A] text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed min-h-[48px]'>
          {test.description}
        </p>

        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4'>
          <div className='flex items-center gap-1'>
            <CalendarIcon className='w-3 h-3' />
            <span className='text-[#33394A]'>{test.startDate}</span>
          </div>
          <span>-</span>
          <div className='flex items-center gap-1'>
            <span className='text-[#33394A]'>{test.endDate}</span>
          </div>
        </div>

        <Button
          type='default'
          onClick={() => onViewDetails(test.id)}
          className='w-full border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors h-[40px]'
        >
          {t('TEST_LIST.BUTTON.VIEW_DETAILS')}
        </Button>
      </div>
    </Card>
  );
}

export type { Test as TestType };
