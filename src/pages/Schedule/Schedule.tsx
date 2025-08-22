import dayjs, { Dayjs } from 'dayjs';
import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import ScheduleTable from './ScheduleList/ScheduleTable';
import Summary from './Summary';
import { STATUS, StatusKey, LEVEL, LevelKey, DATE_TIME } from '@app/constants';
import { useGetSchedule } from '@app/hooks';
import { GetScheduleParams } from '@app/interface/schedule.interface';

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

  const handleFiltersChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const { data } = useGetSchedule({
    keyword: debouncedFilters.keyword || undefined,
    levels: debouncedFilters.level.length ? debouncedFilters.level : undefined,
    statuses: debouncedFilters.status.length ? debouncedFilters.status : undefined,
    dateStart: debouncedFilters.dateRange
      ? dayjs(debouncedFilters.dateRange[0]).startOf('day').format(DATE_TIME.YEAR_MONTH_DATE_TIME)
      : undefined,
    dateEnd: debouncedFilters.dateRange
      ? dayjs(debouncedFilters.dateRange[1]).endOf('day').format(DATE_TIME.YEAR_MONTH_DATE_TIME)
      : undefined,
    page: pagination.page,
    limit: pagination.take,
  } as GetScheduleParams);

  const { levelOptions, statusOptions } = useMemo(() => {
    const levels: string[] = data?.levels || data?.data?.levels || [];
    const statuses: string[] = data?.statuses || data?.data?.statuses || [];

    return {
      levelOptions: (Object.keys(LEVEL) as LevelKey[])
        .filter((key) => levels.includes(key))
        .map((key) => ({
          label: LEVEL[key],
          value: key,
        })),
      statusOptions: (Object.keys(STATUS) as StatusKey[])
        .filter((key) => statuses.includes(key))
        .map((key) => ({
          label: STATUS[key],
          value: key,
        })),
    };
  }, [data]);

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('SCHEDULE.LIST')}</h2>
      </div>

      <Summary
        total={data?.stats?.total}
        happened={data?.stats?.completed}
        notHappened={data?.stats?.upcoming}
        notParticipated={data?.stats?.notJoined}
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
