import dayjs, { Dayjs } from 'dayjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import FilterBar from './FilterBar/FilterBar';
import InterviewTable from './InterviewList/InterviewTable';
import { ConfirmModal } from './Modal/ConfirmModal';
import SelectedBar from './SelectedBar';
import { LEVEL, LevelKey, DATE_TIME } from '@app/constants';
import { useGetInterviewRequests, useCreateMentorSchedule } from '@app/hooks';
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleConfirm = () => {
    const validSelectedKeys = selectedRowKeys.filter((key) =>
      data?.data?.data?.some((item: InterviewColumns) => item.id === key),
    );
    setIsLoading(true);
    createMentorSchedule(
      { interviewRequestIds: validSelectedKeys.map(String) },
      {
        onSuccess: () => {
          setSelectedRowKeys([]);
          setIsModalOpen(false);
        },
        onSettled: () => {
          setIsLoading(false);
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

        <ConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleSetSchedule={handleConfirm}
          quantityKey='MODAL.DESCRIPTION_CONFIRM_INTERVIEW_USER'
          interviewList={selectedRowKeys}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Interview;
