import dayjs, { Dayjs } from 'dayjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import InterviewTable from './InterviewList/InterviewTable';
import SelectedBar from './SelectedBar';
import { LEVEL, LevelKey, DATE_TIME } from '@app/constants';
import { useGetInterviewRequests } from '@app/hooks';

const Interview = () => {
  const { t } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<[Dayjs, Dayjs] | null>(null);
  const [pagination, setPagination] = useState({ page: 1, take: 10 });

  const [debouncedSearch] = useDebounce(searchInput, 500);

  const handleFilterChange = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [pagination.page]);

  const { data } = useGetInterviewRequests({
    name: debouncedSearch || undefined,
    levels: levelFilter.length ? levelFilter : undefined,
    dateStart: dateFilter
      ? dayjs(dateFilter[0]).startOf('day').format(DATE_TIME.YEAR_MONTH_DATE_TIME)
      : undefined,
    dateEnd: dateFilter
      ? dayjs(dateFilter[1]).endOf('day').format(DATE_TIME.YEAR_MONTH_DATE_TIME)
      : undefined,
    page: pagination.page,
    limit: pagination.take,
  });

  const { levelOptions } = useMemo(() => {
    const levels: string[] = data?.data?.levels || [];

    return {
      levelOptions: (Object.keys(LEVEL) as LevelKey[])
        .filter((key) => levels.includes(key))
        .map((key) => ({
          label: LEVEL[key],
          value: key,
        })),
    };
  }, [data]);

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('INTERVIEW.LIST')}</h2>
      </div>

      <div className='bg-white p-3 sm:p-6 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col gap-4 sm:gap-[2.1875rem]'>
        <SelectedBar selectedCount={selectedRowKeys.length} />

        <FilterBar
          total={data?.data?.total || 0}
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
          data={data?.data?.data || []}
          total={data?.data?.total || 0}
          pageCount={data?.data?.totalPages || 1}
          table={pagination}
          setTable={setPagination}
        />
      </div>
    </div>
  );
};

export default Interview;
