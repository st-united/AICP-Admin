import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Input, Button, Space, DatePicker, Select } from 'antd';
import moment, { Moment } from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import UserDetailModal from './UserDetailModal';
import { PaginateProp, Table } from '@app/components/atoms';
import { DATE_TIME, PARAM, USER_PARAM } from '@app/constants';
import { useGetUsers } from '@app/hooks';
import { useGetProvince } from '@app/hooks/useLocation';
import { GetUsersParams, UserColumns } from '@app/interface/user.interface';
import type { InputRef } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

const { Option } = Select;
const { RangePicker } = DatePicker;

const UserTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>(searchParams.get(PARAM.SEARCH) || '');
  const [provinceFilter, setProvinceFilter] = useState<string[]>(
    searchParams.get(USER_PARAM.PROVINCE) ? [searchParams.get(USER_PARAM.PROVINCE)!] : [],
  );
  const [jobFilter, setJobFilter] = useState<string[]>(
    searchParams.get(USER_PARAM.JOB) ? [searchParams.get(USER_PARAM.JOB)!] : [],
  );
  const [statusFilter, setStatusFilter] = useState<boolean[]>(
    searchParams.get(USER_PARAM.STATUS) ? [searchParams.get(USER_PARAM.STATUS) === 'true'] : [],
  );
  const [dateFilter, setDateFilter] = useState<[Moment | null, Moment | null] | null>(
    searchParams.get(USER_PARAM.START_DATE) && searchParams.get(USER_PARAM.END_DATE)
      ? [
          moment(searchParams.get(USER_PARAM.START_DATE)),
          moment(searchParams.get(USER_PARAM.END_DATE)),
        ]
      : null,
  );
  const [paginationState, setPaginationState] = useState<PaginateProp>({
    page: Number(searchParams.get(PARAM.PAGE)) || 1,
    take: Number(searchParams.get(PARAM.TAKE)) || 20,
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);

  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchText) params.search = searchText;
    if (provinceFilter.length === 1) params.province = provinceFilter[0];
    if (jobFilter.length === 1) params.job = jobFilter[0];
    if (statusFilter.length === 1) params.status = String(statusFilter[0]);
    if (dateFilter && dateFilter[0] && dateFilter[1]) {
      params.startDate = dateFilter[0].format(DATE_TIME.YEAR_MONTH_DATE);
      params.endDate = dateFilter[1].format(DATE_TIME.YEAR_MONTH_DATE);
    }
    params.page = String(paginationState.page);
    params.take = String(paginationState.take);

    setSearchParams(params);
  }, [
    searchText,
    provinceFilter,
    jobFilter,
    statusFilter,
    dateFilter,
    paginationState,
    setSearchParams,
  ]);

  const apiParams: GetUsersParams = {
    search: searchText,
    page: paginationState.page,
    take: paginationState.take,
    status: statusFilter.length === 1 ? statusFilter[0] : null,
    province: provinceFilter.length === 1 ? provinceFilter[0] : null,
    startDate:
      dateFilter && dateFilter[0] && dateFilter[1]
        ? new Date(dateFilter[0].format(DATE_TIME.YEAR_MONTH_DATE))
        : null,
    endDate:
      dateFilter && dateFilter[0] && dateFilter[1]
        ? new Date(dateFilter[1].format(DATE_TIME.YEAR_MONTH_DATE))
        : null,
    job: jobFilter.length === 1 ? jobFilter[0] : null,
  };

  const { data: apiResponse, isLoading, refetch } = useGetUsers(apiParams);
  const { t } = useTranslation();
  const { data: provinces } = useGetProvince();
  const userData = apiResponse?.data || [];
  const paginateOptions = {
    table: paginationState,
    total: apiResponse?.meta?.itemCount || 0,
    pageCount: apiResponse?.meta?.pageCount || 0,
    setTable: setPaginationState,
  };

  useEffect(() => {
    refetch();
  }, [searchText, provinceFilter, jobFilter, statusFilter, dateFilter, paginationState, refetch]);

  const handleRowClick = (record: UserColumns) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns: ColumnsType<UserColumns> = [
    {
      title: t('USER.NAME'),
      dataIndex: 'fullName',
      key: 'fullName',
      filterDropdown: () => (
        <div className='p-2'>
          <Input
            ref={searchInput}
            placeholder={t<string>('USER.SEARCH_PLACEHOLDER')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
            <Button size='small' onClick={() => setSearchText('')}>
              {t('USER.RESET_FILTER')}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => (
        <SearchOutlined
          className={`text-center text-lg mt-1 ${searchText ? 'text-blue-500' : ''}`}
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
      key: 'phoneNumber',
    },
    {
      title: t('USER.DATE_OF_BIRTH'),
      dataIndex: 'dob',
      key: 'dob',
      render: (date: string) =>
        date ? moment(date).format(DATE_TIME.DAY_MONTH_YEAR) : t('USER.NO_DATA'),
    },
    {
      title: t('USER.PROVINCE'),
      dataIndex: 'province',
      key: 'province',
      render: (province: string) => province || t('USER.NO_DATA'),
      filterDropdown: () => (
        <div className='p-2'>
          <Select
            mode='multiple'
            placeholder={t('USER.PROVINCE_PLACEHOLDER')}
            value={provinceFilter}
            onChange={setProvinceFilter}
            className='w-52 mb-2'
            optionFilterProp='children'
            showSearch
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {provinces?.map((province) => (
              <Option key={province.codeName} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
          <div>
            <Button size='small' onClick={() => setProvinceFilter([])}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        </div>
      ),
      filterIcon: () => (
        <FilterOutlined className={provinceFilter.length > 0 ? 'text-blue-500' : undefined} />
      ),
    },
    {
      title: t('USER.JOB'),
      dataIndex: 'job',
      key: 'job',
      render: (job: string) => job || t('USER.NO_DATA'),
      filterDropdown: () => (
        <div className='p-2'>
          <Select
            mode='multiple'
            placeholder={t('USER.SELECT_JOB')}
            value={jobFilter}
            onChange={setJobFilter}
            className='w-52 mb-2'
            allowClear
          >
            <Option value={t('USER.JOB_WORKING')}>{t('USER.JOB_WORKING')}</Option>
            <Option value={t('USER.JOB_STUDENT')}>{t('USER.JOB_STUDENT')}</Option>
          </Select>
          <div>
            <Button size='small' onClick={() => setJobFilter([])}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        </div>
      ),
      filterIcon: () => (
        <FilterOutlined className={jobFilter.length > 0 ? 'text-blue-500' : undefined} />
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
            value={statusFilter}
            onChange={setStatusFilter}
            className='w-52 mb-2'
            allowClear
          >
            <Option value={true}>{t('USER.STATUS_ACTIVE')}</Option>
            <Option value={false}>{t('USER.STATUS_INACTIVE')}</Option>
          </Select>
          <div>
            <Button size='small' onClick={() => setStatusFilter([])}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        </div>
      ),
      filterIcon: () => (
        <FilterOutlined className={statusFilter.length > 0 ? 'text-blue-500' : undefined} />
      ),
    },
    {
      title: t('USER.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => moment(date).format(DATE_TIME.DAY_MONTH_YEAR),

      filterDropdown: () => (
        <div className='p-2'>
          <RangePicker
            value={dateFilter}
            onChange={setDateFilter}
            format={DATE_TIME.DAY_MONTH_YEAR}
            placeholder={[t('USER.FROM'), t('USER.TO')]}
            className='mb-2'
          />
          <div>
            <Button size='small' onClick={() => setDateFilter(null)}>
              {t('USER.RESET_FILTER')}
            </Button>
          </div>
        </div>
      ),
      filterIcon: () => <FilterOutlined className={dateFilter ? 'text-blue-500' : undefined} />,
    },
  ];

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
        isVisible={isModalVisible}
        selectedUser={selectedUser}
        onClose={handleModalClose}
      />
    </>
  );
};

export default UserTable;
