import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Input, Button, Space, DatePicker, Select, Alert } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import UserDetailModal from './UserDetailModal';
import { Table } from '@app/components/atoms';
import { DATE_TIME } from '@app/constants';
import { useGetDomainNames, useGetUsers } from '@app/hooks';
import { useGetProvince } from '@app/hooks/useLocation';
import { GetListParams } from '@app/interface/common.interface';
import { Domain } from '@app/interface/domain.interface';
import { GetUsersParams, UserColumns } from '@app/interface/user.interface';
import type { InputRef } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface FilterState {
  searchText: string;
  provinceFilter: string[];
  jobFilter: string[];
  statusFilter: boolean[];
  dateFilter: [Dayjs, Dayjs] | null;
  pagination: {
    page: number;
    take: number;
  };
}

interface ModalState {
  isVisible: boolean;
  selectedUser: UserColumns | null;
}

const UserTable: React.FC = () => {
  const { t } = useTranslation();
  const { data: domainNames } = useGetDomainNames();
  const searchInput = useRef<InputRef>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    provinceFilter: [],
    jobFilter: [],
    statusFilter: [],
    dateFilter: null,
    pagination: { page: 1, take: 20 },
  });

  const [debouncedSearch] = useDebounce(filters.searchText, 500);
  const [modalState, setModalState] = useState<ModalState>({
    isVisible: false,
    selectedUser: null,
  });

  const [onlyStatus] = filters.statusFilter;
  const [startDate, endDate] = filters.dateFilter || [];

  const apiParams: GetUsersParams = {
    search: debouncedSearch,
    page: filters.pagination.page,
    take: filters.pagination.take,
    status: filters.statusFilter.length === 1 ? onlyStatus : null,
    province: filters.provinceFilter.length > 0 ? filters.provinceFilter : null,
    job: filters.jobFilter.length > 0 ? filters.jobFilter : null,
    startDate: startDate ? new Date(startDate.format(DATE_TIME.YEAR_MONTH_DATE)) : null,
    endDate: endDate ? new Date(endDate.format(DATE_TIME.YEAR_MONTH_DATE)) : null,
  };

  const { data: apiResponse, isLoading, refetch } = useGetUsers(apiParams);
  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    isError: provinceError,
  } = useGetProvince();
  const userData = apiResponse?.data || [];

  const paginateOptions = {
    table: filters.pagination,
    total: apiResponse?.meta?.itemCount || 0,
    pageCount: apiResponse?.meta?.pageCount || 0,
    setTable: (newPagination: GetListParams) =>
      setFilters((prev) => ({ ...prev, pagination: newPagination })),
  };

  const handleRowClick = (record: UserColumns) => {
    setModalState({ isVisible: true, selectedUser: record });
  };

  const handleModalClose = () => {
    setModalState({ isVisible: false, selectedUser: null });
  };

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    refetch();
  }, [
    debouncedSearch,
    filters.provinceFilter,
    filters.jobFilter,
    filters.statusFilter,
    filters.dateFilter,
    filters.pagination,
    refetch,
  ]);

  useEffect(() => {
    // Reset to page 1 if any of the filters change
    setFilters((prev) => {
      if (prev.pagination.page !== 1) {
        return {
          ...prev,
          pagination: {
            ...prev.pagination,
            page: 1,
          },
        };
      }
      return prev;
    });
  }, [
    debouncedSearch,
    filters.provinceFilter,
    filters.jobFilter,
    filters.statusFilter,
    filters.dateFilter,
  ]);

  const columns: ColumnsType<UserColumns> = useMemo(
    () => [
      {
        title: t('USER.NAME'),
        dataIndex: 'fullName',
        key: 'fullName',
        filterDropdown: () => (
          <div className='p-2'>
            <Input
              ref={searchInput}
              placeholder={t<string>('USER.SEARCH_PLACEHOLDER')}
              value={filters.searchText}
              onChange={(e) => updateFilter('searchText', e.target.value)}
              onPressEnter={() => searchInput.current?.blur()}
              className='w-52 mb-2 block'
            />
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={() => searchInput.current?.focus()}
                className='rounded-md bg-[#fe7743] border-[#fe7743]'
              >
                {t('USER.SEARCH')}
              </Button>
              <Button size='small' onClick={() => updateFilter('searchText', '')}>
                {t('USER.RESET_FILTER')}
              </Button>
            </Space>
          </div>
        ),
        filterIcon: () => (
          <SearchOutlined
            className={`text-center text-lg mt-1 ${filters.searchText ? 'text-blue-500' : ''}`}
          />
        ),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      },
      {
        title: t('USER.EMAIL'),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: t('USER.PHONE'),
        dataIndex: 'phoneNumber',
        width: 150,
        key: 'phoneNumber',
      },
      {
        title: t('USER.DATE_OF_BIRTH'),
        dataIndex: 'dob',
        key: 'dob',
        render: (date: string) => (date ? dayjs(date).format(DATE_TIME.DAY_MONTH_YEAR) : ''),
      },
      {
        title: t('USER.PROVINCE'),
        dataIndex: 'province',
        key: 'province',
        width: 180,
        render: (province: string) => province || '',
        filterDropdown: () => (
          <div className='p-2'>
            <Select
              mode='multiple'
              placeholder={t('USER.PROVINCE_PLACEHOLDER')}
              value={filters.provinceFilter}
              onChange={(value) => updateFilter('provinceFilter', value)}
              className='w-52 mb-2 block'
              optionFilterProp='children'
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
              loading={isLoadingProvinces}
              disabled={isLoadingProvinces || !!provinceError}
            >
              {provinces?.map((province) => (
                <Option key={province.codeName} value={province.name}>
                  {province.name}
                </Option>
              ))}
            </Select>
            <Button
              size='small'
              onClick={() => updateFilter('provinceFilter', [])}
              disabled={isLoadingProvinces || !!provinceError}
            >
              {t('USER.RESET_FILTER')}
            </Button>
            {provinceError && (
              <Alert message={t('USER.PROVINCE_ERROR')} type='error' className='mt-2 p-1' />
            )}
          </div>
        ),
        filterIcon: () => (
          <FilterOutlined
            className={filters.provinceFilter.length > 0 ? 'text-blue-500' : undefined}
          />
        ),
      },
      {
        title: t('USER.JOB'),
        dataIndex: 'job',
        key: 'job',
        width: 320,
        render: (job: Domain[]) => job.map((item) => item.name).join(', ') || '',
        filterDropdown: () => (
          <div className='p-2'>
            <Select
              mode='multiple'
              placeholder={t('USER.SELECT_JOB')}
              value={filters.jobFilter}
              onChange={(value) => updateFilter('jobFilter', value)}
              className='w-52 mb-2 block'
              allowClear
            >
              {domainNames?.map((domain) => (
                <Option key={domain.id} value={domain.id}>
                  {domain.name}
                </Option>
              ))}
            </Select>
            <Button size='small' onClick={() => updateFilter('jobFilter', [])}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        ),
        filterIcon: () => (
          <FilterOutlined className={filters.jobFilter.length > 0 ? 'text-blue-500' : undefined} />
        ),
      },
      {
        title: t('USER.STATUS'),
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => (
          <Space className={status ? 'text-[#269900]' : 'text-[#F36960]'}>
            {status ? t('USER.STATUS_ACTIVE') : t('USER.STATUS_INACTIVE')}
          </Space>
        ),
        filterDropdown: () => (
          <div className='p-2'>
            <Select
              mode='multiple'
              placeholder={t('USER.SELECT_STATUS')}
              value={filters.statusFilter}
              onChange={(value) => updateFilter('statusFilter', value)}
              className='w-52 mb-2 block'
              allowClear
            >
              <Option value={true}>{t('USER.STATUS_ACTIVE')}</Option>
              <Option value={false}>{t('USER.STATUS_INACTIVE')}</Option>
            </Select>
            <Button size='small' onClick={() => updateFilter('statusFilter', [])}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        ),
        filterIcon: () => (
          <FilterOutlined
            className={filters.statusFilter.length > 0 ? 'text-blue-500' : undefined}
          />
        ),
      },
      {
        title: t('USER.CREATED_AT'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format(DATE_TIME.DAY_MONTH_YEAR),
        filterDropdown: () => (
          <div className='p-2'>
            <RangePicker
              value={filters.dateFilter}
              onChange={(value) => updateFilter('dateFilter', value)}
              format={DATE_TIME.DAY_MONTH_YEAR}
              placeholder={[t('USER.FROM'), t('USER.TO')]}
              className='w-full mb-2'
            />
            <div className='flex justify-start'>
              <Button size='small' onClick={() => updateFilter('dateFilter', null)}>
                {t('USER.RESET_FILTER')}
              </Button>
            </div>
          </div>
        ),
        filterIcon: () => (
          <FilterOutlined className={filters.dateFilter ? 'text-blue-500' : undefined} />
        ),
      },
    ],
    [filters, t, provinces],
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={userData}
        loading={isLoading}
        paginate={paginateOptions}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          className: 'cursor-pointer',
        })}
      />
      <UserDetailModal
        isVisible={modalState.isVisible}
        selectedUser={modalState.selectedUser}
        onClose={handleModalClose}
      />
    </>
  );
};
export default UserTable;
