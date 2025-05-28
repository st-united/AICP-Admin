import { CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Button, Form, Input, InputRef, Space, Tooltip } from 'antd';
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/Table';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpandedRow } from './ExpandedMentorRow';
import Status from './Status';
import { Table } from '@app/components/atoms';
import MentorUpSertModal from '@app/components/molecules/Modal/MentorUpSertModal';
import { OrderDirection } from '@app/constants/order';
import { useGetMentor, useUpdateMentor } from '@app/hooks';
import { GetMentorsParams, MentorColumns } from '@app/interface/user.interface';
import { formatDate } from '@app/utils';
import './MentorTable.scss';

type DataIndex = keyof MentorColumns | string;

interface TableState {
  page: number;
  take: number;
  isActive?: boolean;
}

const MentorTable = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mentorId, setMentorId] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const [table, setTable] = useState<TableState>({
    page: 1,
    take: 20,
  });

  const getMentorsParams: GetMentorsParams = {
    search: searchText,
    page: table.page,
    take: table.take,
    order: OrderDirection.DESC,
    ...(table.isActive !== undefined && { isActive: table.isActive }),
  };

  const { data: mentorData, isLoading } = useGetMentor(getMentorsParams);
  const { mutate: updateMentor } = useUpdateMentor();

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
  ) => {
    const isActiveFilters = filters.isActive as string[] | null;
    const hasBothFilters = isActiveFilters?.length === 2;
    const isReset = isActiveFilters === null || isActiveFilters === undefined;

    setTable((prev) => ({
      ...prev,
      page: pagination.current || 1,
      take: 20,
      isActive: isReset ? undefined : hasBothFilters ? undefined : isActiveFilters?.[0] === 'true',
    }));
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
          className='mb-2 block'
        />
        <Space>
          <Button
            type='primary'
            className='rounded-md bg-[#fe7743] border-[#fe7743] w-[90px]'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='middle'
          >
            Search
          </Button>
          <Button
            className='rounded-md text-[#fe7743] border-[#fe7743] w-[90px]'
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size='middle'
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined className={`text-[20px] ${filtered ? 'text-[#1890ff]' : ''}`} />
    ),
    onFilter: (value, record) => {
      const keys = (dataIndex as string).split('.');
      let data: any = record;
      for (const key of keys) {
        data = data?.[key];
      }
      return data
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
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
      render: (_, record) => (
        <Button
          type='link'
          className='text-[#1570EF] text-left hover:text-blue-800'
          onClick={() => showMentorUpSertModal(record.id.toString())}
        >
          {record.user.fullName}
        </Button>
      ),
      ...getColumnSearchProps('user.fullName'),
    },
    {
      title: t('MENTOR.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 230,
      render: (_, record) => record.user.email,
    },
    {
      title: t('MENTOR.PHONENUMBER'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
      render: (_, record) => record.user.phoneNumber,
    },
    {
      title: t('MENTOR.INTERVIEW_COUNT'),
      dataIndex: 'completedCount',
      key: 'completedCount',
      width: 200,
    },
    {
      title: t('MENTOR.STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      render(value, record) {
        const isExpanded = expandedRowKeys.includes(record.id);
        const isEnabled = !!record.upcomingCount;
        return (
          <div className='grid grid-cols-[70%_30%] w-full gap-3'>
            <Status isActive={value} />
            <div className='flex items-center justify-start'>
              <Tooltip
                className='calendar-tooltip'
                title={t('MENTOR.INTERVIEW_TOOLTIP')}
                placement='top'
                color='black'
                overlayClassName='custom-tooltip'
              >
                <Badge className='custom-badge' count={record.upcomingCount} showZero size='small'>
                  <CalendarOutlined
                    className='cursor-pointer hover:!text-sky-700 text-[26px] text-[#08c]'
                    onClick={() => {
                      if (isEnabled) {
                        setExpandedRowKeys(isExpanded ? [] : [record.id]);
                      }
                    }}
                  />
                </Badge>
              </Tooltip>
            </div>
          </div>
        );
      },
      width: 280,
      filters: [
        { text: t('MENTOR.ACTIVE'), value: 'true' },
        { text: t('MENTOR.INACTIVE'), value: 'false' },
      ],
      onFilter: (value, record) => String(record.isActive) === value,
    },
    {
      title: t('MENTOR.CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => {
        return <div className='font-medium'>{formatDate(value)}</div>;
      },
      width: 150,
    },
  ];

  const showMentorUpSertModal = (mentorId: string) => {
    setIsModalOpen(true);
    setMentorId(mentorId);
  };

  const handleMentorCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setMentorId('');
  };

  const handleMentorUpdate = async () => {
    const values = await form.validateFields();
    updateMentor({ id: mentorId, ...values });
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <>
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
      <MentorUpSertModal
        isOpen={isModalOpen}
        onCancel={handleMentorCancel}
        onOk={handleMentorUpdate}
        form={form}
        isUpdate={true}
        mentorId={mentorId}
      />
    </>
  );
};

export default MentorTable;
