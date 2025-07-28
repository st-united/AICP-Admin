import { useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FilterBar from './FilterBar/FilterBar';
import InterviewRegistrationTable from './InterviewRegistrationTable/InterviewRegistrationTable';
import SelectedBar from './SelectedBar';
import { socket } from '../../constants/socket';
import { QUERY_KEY } from '@app/constants';

const InterviewRegistration = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableData, setTableData] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [table, setTable] = useState({ page: 1, take: 10 });

  // Socket listeners
  useEffect(() => {
    const handleConnect = () => {
      console.log('[Socket] Connected with ID:', socket.id);
    };

    const handleDisconnect = () => {
      console.warn('[Socket] Disconnected');
    };

    const handleConnectError = (err: any) => {
      console.error('[Socket] Connection Error:', err.message);
    };

    const handleUserBookings = (data: any) => {
      console.log('[Socket] Received userBookings:', data);
      setTableData(data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INTERVIEW_REGISTRATION],
      });
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('userBookings', handleUserBookings);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('userBookings', handleUserBookings);
    };
  }, [queryClient]);

  // Gửi request socket khi có thay đổi filter hoặc pagination
  useEffect(() => {
    const payload = {
      keyword: search,
      level: levelFilter === 'all' ? undefined : levelFilter,
      date: dateFilter === 'all' ? undefined : dateFilter,
      page: table.page,
      take: table.take,
    };

    console.log('[Socket] Emitting filter:', payload);

    if (socket.connected) {
      socket.emit('getUserBookings', payload);
    }
  }, [search, levelFilter, dateFilter, table]);

  // Debounce search
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSelectedAction = () => {
    const selectedData = tableData?.data?.filter((item: any) => selectedRowKeys.includes(item.id));
    console.log('Selected rows:', selectedRowKeys);
    console.log('Selected data:', selectedData);
  };

  const { uniqueLevels, uniqueDates } = useMemo(() => {
    const rawData = Array.isArray(tableData?.data) ? tableData.data : [];
    const levels = new Set<string>();
    const dates = new Set<string>();

    rawData.forEach((item: any) => {
      if (item.exam?.sfiaLevel) levels.add(item.exam.sfiaLevel);
      if (item.scheduledAt) {
        const date = new Date(item.scheduledAt).toISOString().split('T')[0];
        dates.add(date);
      }
    });

    return {
      uniqueLevels: Array.from(levels).sort(),
      uniqueDates: Array.from(dates).sort(),
    };
  }, [tableData]);

  return (
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex items-center'>
        <h2 className='!text-2xl !mb-0'>{t('INTERVIEW_REGISTRATION.LIST')}</h2>
      </div>

      <div className='interview-registration-card bg-white p-3 sm:p-6 rounded-[16px] sm:rounded-[20px] flex flex-col gap-4 sm:gap-[35px]'>
        <SelectedBar selectedCount={selectedRowKeys.length} onAction={handleSelectedAction} />

        <FilterBar
          total={tableData?.total || 0}
          searchValue={searchInput}
          onSearchChange={(value) => {
            setSearchInput(value);
            debouncedSearch(value);
          }}
          levelFilter={levelFilter}
          onLevelFilterChange={setLevelFilter}
          levelOptions={uniqueLevels}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          dateOptions={uniqueDates}
        />

        <InterviewRegistrationTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          keyword={search}
          levelFilter={levelFilter}
          dateFilter={dateFilter}
          data={tableData?.data || []}
          total={tableData?.total || 0}
          pageCount={tableData?.totalPages || 1}
          table={table}
          setTable={setTable}
        />
      </div>
    </div>
  );
};

export default InterviewRegistration;
