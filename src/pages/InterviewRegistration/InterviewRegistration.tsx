import { Dayjs } from 'dayjs';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import InterviewRegistrationTable from './InterviewRegistrationTable/InterviewRegistrationTable';
import SelectedBar from './SelectedBar';
import { useInterviewRegistrationSocket } from '@app/hooks/index';
import { InterviewRegistrationColumns } from '@app/interface/interviewRegistration.interface';

const InterviewRegistration = () => {
  const { t } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<[Dayjs, Dayjs] | null>(null);
  const [pagination, setPagination] = useState({ page: 1, take: 10 });

  const [debouncedSearch] = useDebounce(searchInput, 500);

  const handleFilterChange = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  const { data } = useInterviewRegistrationSocket({
    search: debouncedSearch,
    levelFilter,
    dateFilter,
    page: pagination.page,
    limit: pagination.take,
  });

  const levelOptions = useMemo(() => {
    const levels = new Set<string>();
    data?.data?.forEach((item: InterviewRegistrationColumns) => {
      if (item.level) levels.add(item.level);
    });
    return Array.from(levels).sort();
  }, [data?.data]);

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('INTERVIEW_REGISTRATION.LIST')}</h2>
      </div>

      <div className='interview-registration-card bg-white p-3 sm:p-6 rounded-[16px] sm:rounded-[20px] flex flex-col gap-4 sm:gap-[35px]'>
        <SelectedBar
          selectedCount={selectedRowKeys.length}
          onAction={() => {
            // console.log('Selected rows:', selectedRowKeys);
          }}
        />

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

        <InterviewRegistrationTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          data={data?.data || []}
          total={data?.total || 0}
          pageCount={data?.totalPages || 1}
          table={pagination}
          setTable={setPagination}
        />
      </div>
    </div>
  );
};

export default InterviewRegistration;
