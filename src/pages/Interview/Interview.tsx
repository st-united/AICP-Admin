import { Dayjs } from 'dayjs';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import InterviewTable from './InterviewList/InterviewTable';
import { ConfirmModal } from './Modal/ConfirmModal';
import SelectedBar from './SelectedBar';
import { useCreateMentorSchedule, useInterviewSocket } from '@app/hooks';
import { InterviewColumns } from '@app/interface/interview.interface';

const Interview = () => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<[Dayjs, Dayjs] | null>(null);
  const [pagination, setPagination] = useState({ page: 1, take: 10 });
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const { mutate: createMentorSchedule } = useCreateMentorSchedule();

  const handleFilterChange = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const { data } = useInterviewSocket({
    search: debouncedSearch,
    levelFilter,
    dateFilter,
    page: pagination.page,
    limit: pagination.take,
  });

  const levelOptions = useMemo(() => {
    const levels = new Set<string>();
    data?.data?.forEach((item: InterviewColumns) => {
      if (item.level) levels.add(item.level);
    });
    return Array.from(levels).sort();
  }, [data?.data]);

  const handleConfirm = () => {
    createMentorSchedule(
      { interviewRequestIds: selectedRowKeys.map(String) },
      {
        onSuccess: () => {
          setSelectedRowKeys([]);
          setIsModalOpen(false);
        },
      },
    );
  };

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('INTERVIEW.LIST')}</h2>
      </div>

      <div className='bg-white p-3 sm:p-6 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col gap-4 sm:gap-[2.1875rem]'>
        <SelectedBar selectedCount={selectedRowKeys.length} onAction={() => setIsModalOpen(true)} />

        <FilterBar
          total={data?.total || 0}
          searchValue={searchInput}
          onSearchChange={(value) => {
            setSearchInput(value);
            handleFilterChange();
          }}
          levelFilter={levelFilter}
          onLevelFilterChange={(value) => {
            setLevelFilter(value);
            handleFilterChange();
          }}
          levelOptions={levelOptions}
          dateFilter={dateFilter}
          onDateFilterChange={(value) => {
            setDateFilter(value);
            handleFilterChange();
          }}
        />

        <InterviewTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          data={data?.data || []}
          total={data?.total || 0}
          pageCount={data?.totalPages || 1}
          table={pagination}
          setTable={setPagination}
        />

        <ConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleSetSchedule={handleConfirm}
          quantityKey='MODAL.DESCRIPTION_CONFIRM_INTERVIEW_USER'
          interviewList={selectedRowKeys}
        />
      </div>
    </div>
  );
};

export default Interview;
