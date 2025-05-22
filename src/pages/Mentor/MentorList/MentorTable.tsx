import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tooltip } from 'antd';
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/Table';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpandedRow } from './ExpandedMentorRow';
import Status from './Status';
import { Table } from '@app/components/atoms';
import { useGetMentor } from '@app/hooks';
import { GetMentorsParams, MentorColumns } from '@app/interface/user.interface';
import { formatDate } from '@app/utils';
import './MentorTable.scss';

type DataIndex = keyof MentorColumns | string;

const MentorTable = () => {
  const { t } = useTranslation();

  const [table, setTable] = useState({
    page: 1,
    take: 20,
  });

  const getMentorsParams: GetMentorsParams = {
    page: table.page,
    take: table.take,
  };

  const { data: mentorData, isLoading } = useGetMentor(getMentorsParams);

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTable({
      page: pagination.current || 1,
      take: 20,
    });
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<MentorColumns> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className='p-2'>
        <Input
          ref={searchInput}
          placeholder={t('MENTOR.SEARCH_FULLNAME_PLACEHOLDER') as string}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            className='rounded-md'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='middle'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            className='rounded-md'
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size='middle'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined, fontSize: 20 }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex as keyof MentorColumns]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<MentorColumns> = [
    {
      title: t('MENTOR.FULLNAME'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render(_, record) {
        return <div>{record.user.fullName}</div>;
      },
      ...getColumnSearchProps('user.fullName'),
    },
    {
      title: t('MENTOR.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 230,
      render(_, record) {
        return <>{record.user.email}</>;
      },
    },
    {
      title: t('MENTOR.PHONENUMBER'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
      render(_, record) {
        return <>{record.user.phoneNumber}</>;
      },
    },
    {
      title: t('MENTOR.INTERVIEW_COUNT'),
      dataIndex: 'completedCount',
      key: 'completedCount',
      width: 200,
      render(_, record) {
        return (
          <>
            <span>{record.completedCount}</span>
          </>
        );
      },
    },
    {
      title: t('MENTOR.STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      render(_, record) {
        const isExpanded = expandedRowKeys.includes(record.id);
        return (
          <div className='flex items-center justify-start flex-row gap-3'>
            <Status isActive={record.isActive} />
            <Tooltip
              className='calendar-tooltip'
              title={t('MENTOR.INTERVIEW_TOOLTIP')}
              placement='top'
              color='black'
              overlayClassName='custom-tooltip'
            >
              <CalendarOutlined
                className='cursor-pointer hover:!text-sky-700'
                onClick={() => {
                  setExpandedRowKeys(isExpanded ? [] : [record.id]);
                }}
                style={{ fontSize: '26px', color: '#08c' }}
              />
            </Tooltip>
          </div>
        );
      },
      width: 250,
    },
    {
      title: t('MENTOR.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record: MentorColumns) => {
        return <div className='font-medium'>{formatDate(record.createdAt)}</div>;
      },
      width: 150,
    },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <Table
        columns={columns}
        dataSource={mentorData?.data}
        loading={isLoading}
        onChange={handleTableChange}
        paginate={{
          table,
          total: mentorData?.meta?.itemCount,
          pageCount: mentorData?.meta?.pageCount,
          setTable,
        }}
        expandableRender={(record) => <ExpandedRow mentorId={record.id} />}
        expandedRowKeys={expandedRowKeys}
        setExpandedRowKeys={setExpandedRowKeys}
      />
    </div>
  );
};

export default MentorTable;
