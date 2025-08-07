import { Dayjs } from 'dayjs';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import ScheduleTable from './ScheduleList/ScheduleTable';
import Summary from './Summary';
import { STATUS, StatusKey } from '@app/constants';
import { useGetSchedule } from '@app/hooks';
import { ScheduleColumns, GetScheduleParams } from '@app/interface/schedule.interface';

interface FilterState {
  keyword: string;
  level: string[];
  status: string[];
  dateRange: [Dayjs, Dayjs] | null;
}

const Schedule = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    level: [],
    status: [],
    dateRange: null,
  });

  const [pagination, setPagination] = useState({ page: 1, take: 10 });
  const [debouncedFilters] = useDebounce(filters, 500);

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const { data } = useGetSchedule({
    keyword: debouncedFilters.keyword,
    level: debouncedFilters.level,
    status: debouncedFilters.status,
    dateFilter: debouncedFilters.dateRange,
    page: pagination.page,
    limit: pagination.take,
  } as GetScheduleParams);

  const levelOptions = useMemo(() => {
    const levels = new Set<string>();
    data?.data?.forEach((item: ScheduleColumns) => {
      if (item.level) levels.add(item.level);
    });
    return Array.from(levels).sort();
  }, [data?.data]);

  const statusOptions = useMemo(() => {
    const statuses = new Set<string>();
    data?.data?.forEach((item: ScheduleColumns) => {
      if (item.status) statuses.add(item.status);
    });

    return Array.from(statuses)
      .filter((key): key is StatusKey => key in STATUS)
      .map((key) => ({
        label: STATUS[key],
        value: key,
      }));
  }, [data?.data]);

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('SCHEDULE.LIST')}</h2>
      </div>

      <Summary
        total={data?.stats?.total || 0}
        happened={data?.stats?.completed || 0}
        notHappened={data?.stats?.upcoming || 0}
        notParticipated={data?.stats?.notJoined || 0}
      />

      <div className='bg-white p-3 sm:p-6 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col gap-4 sm:gap-[2.1875rem]'>
        <FilterBar
          total={data?.total || 0}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          levelOptions={levelOptions}
          statusOptions={statusOptions}
        />

        <ScheduleTable
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

export default Schedule;
