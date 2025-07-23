import { HomeOutlined } from '@ant-design/icons';
import { Select, Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import InterviewFilterBar from '../../components/organisms/InterviewFilterBar/InterviewFilterBar';
import { Table as CustomTable } from '@app/components/atoms';

const { Option } = Select;

const data = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'ptanh125@gmail.com',
    phone: '0935112120',
    test: 'Test for dev',
    level: 'Level 1',
    result: 'Level 1',
    date: '14/07/2025 11:00 AM',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranb@gmail.com',
    phone: '0912345678',
    test: 'Test for QA',
    level: 'Level 2',
    result: 'Level 2',
    date: '15/07/2025 09:00 AM',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@gmail.com',
    phone: '0987654321',
    test: 'Test for dev',
    level: 'Level 1',
    result: 'Level 1',
    date: '10/07/2025 14:00 PM',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamd@gmail.com',
    phone: '0909090909',
    test: 'Test for BA',
    level: 'Level 2',
    result: 'Level 2',
    date: '10/07/2025 10:00 AM',
  },
  {
    id: 5,
    name: 'Ngô Văn E',
    email: 'ngoe@gmail.com',
    phone: '0933333333',
    test: 'Test for dev',
    level: 'Level 1',
    result: 'Level 1',
    date: '18/07/2025 11:00 AM',
  },
  {
    id: 6,
    name: 'Đỗ Thị F',
    email: 'dotf@gmail.com',
    phone: '0944444444',
    test: 'Test for QA',
    level: 'Level 2',
    result: 'Level 2',
    date: '18/07/2025 13:00 PM',
  },
  {
    id: 7,
    name: 'Bùi Văn G',
    email: 'buig@gmail.com',
    phone: '0955555555',
    test: 'Test for dev',
    level: 'Level 1',
    result: 'Level 1',
    date: '20/07/2025 15:00 PM',
  },
  {
    id: 8,
    name: 'Vũ Thị H',
    email: 'vuth@gmail.com',
    phone: '0966666666',
    test: 'Test for BA',
    level: 'Level 2',
    result: 'Level 2',
    date: '21/07/2025 16:00 PM',
  },
  {
    id: 9,
    name: 'Lý Văn I',
    email: 'lyvi@gmail.com',
    phone: '0977777777',
    test: 'Test for dev',
    level: 'Level 1',
    result: 'Level 1',
    date: '20/07/2025 17:00 PM',
  },
  {
    id: 10,
    name: 'Trịnh Thị K',
    email: 'trinhk@gmail.com',
    phone: '0988888888',
    test: 'Test for QA',
    level: 'Level 2',
    result: 'Level 2',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 11,
    name: 'Lâm Quốc Bảo',
    email: 'baolq@gmail.com',
    phone: '0901000001',
    test: 'Test of Developer',
    level: 'Level 2',
    result: 'Level 1',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 12,
    name: 'Đinh Thị Lan',
    email: 'lan.dinh@gmail.com',
    phone: '0901000002',
    test: 'Test of BA',
    level: 'Level 1',
    result: 'Level 1',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 13,
    name: 'Trương Minh Tuấn',
    email: 'tuantruong@gmail.com',
    phone: '0901000003',
    test: 'Test of Developer',
    level: 'Level 3',
    result: 'Level 2',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 14,
    name: 'Phan Thị Như',
    email: 'phan.nhu@gmail.com',
    phone: '0901000004',
    test: 'Test of BA',
    level: 'Level 2',
    result: 'Level 3',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 15,
    name: 'Ngô Quang Huy',
    email: 'huyngo@gmail.com',
    phone: '0901000005',
    test: 'Test of Developer',
    level: 'Level 2',
    result: 'Level 2',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 16,
    name: 'Tạ Thị Linh',
    email: 'linhtta@gmail.com',
    phone: '0901000006',
    test: 'Test of BA',
    level: 'Level 1',
    result: 'Level 1',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 17,
    name: 'Vương Anh Tuấn',
    email: 'tuanvuong@gmail.com',
    phone: '0901000007',
    test: 'Test of Developer',
    level: 'Level 3',
    result: 'Level 3',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 18,
    name: 'Đoàn Mỹ Dung',
    email: 'dungdoan@gmail.com',
    phone: '0901000008',
    test: 'Test of BA',
    level: 'Level 2',
    result: 'Level 2',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 19,
    name: 'Lý Quốc Hưng',
    email: 'hungly@gmail.com',
    phone: '0901000009',
    test: 'Test of Developer',
    level: 'Level 1',
    result: 'Level 1',
    date: '20/07/2025 18:00 PM',
  },
  {
    id: 20,
    name: 'Cao Thị Thảo',
    email: 'thaocao@gmail.com',
    phone: '0901000010',
    test: 'Test of BA',
    level: 'Level 3',
    result: 'Level 2',
    date: '20/07/2025 18:00 PM',
  },
];

const getColumns = (t: (key: string) => string) => [
  { title: t('INTERVIEW_REGISTRATION.NAME'), dataIndex: 'name', key: 'name' },
  { title: t('INTERVIEW_REGISTRATION.EMAIL'), dataIndex: 'email', key: 'email' },
  { title: t('INTERVIEW_REGISTRATION.PHONE'), dataIndex: 'phone', key: 'phone' },
  { title: t('INTERVIEW_REGISTRATION.TEST'), dataIndex: 'test', key: 'test' },
  {
    title: t('INTERVIEW_REGISTRATION.RESULT'),
    dataIndex: 'result',
    key: 'result',
    render: (text: string) => <span>{text}</span>,
  },
  { title: t('INTERVIEW_REGISTRATION.INTERVIEW_DATE'), dataIndex: 'date', key: 'date' },
];

const InterviewRegistration = () => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [table, setTable] = useState({ page: 1, take: 10 });
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const total = data.length;
  const pageCount = Math.ceil(total / table.take);

  const uniqueDates = Array.from(new Set(data.map((item) => item.date.split(' ')[0])));
  const uniqueLevels = Array.from(new Set(data.map((item) => item.level)));

  const filteredData = data.filter((item) => {
    const searchText = search.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.toLowerCase().includes(searchText) ||
      item.test.toLowerCase().includes(searchText) ||
      item.result.toLowerCase().includes(searchText) ||
      item.date.toLowerCase().includes(searchText);
    const matchLevel = levelFilter === 'all' || item.level === levelFilter;
    let matchDate = true;
    if (dateFilter !== 'all') {
      matchDate = item.date.split(' ')[0] === dateFilter;
    }
    return matchSearch && matchLevel && matchDate;
  });

  return (
    <div className='w-full mx-auto pb-8 px-2 sm:px-4 flex flex-col gap-4 sm:gap-6 overflow-y-auto'>
      <h2 className='text-[22px] sm:text-[30px] font-bold mx-6'>
        {t('INTERVIEW_REGISTRATION.LIST_TITLE')}
      </h2>
      <div className='interview-registration-card bg-white p-3 sm:p-6 rounded-[16px] sm:rounded-[20px] flex flex-col gap-4 sm:gap-[35px]'>
        <div className='interview-selected-bar bg-[#ffe9e187] border border-orange-100 rounded-lg px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3'>
          <span className='text-black text-base md:text-lg font-semibold'>
            {t('INTERVIEW_REGISTRATION.SELECTED')} : {selectedRowKeys.length}
          </span>
          <Button
            type='primary'
            className={`w-full sm:w-auto sm:min-w-[66px] h-[44px] text-base md:text-lg border-none ${
              selectedRowKeys.length === 0 ? 'cursor-not-allowed' : 'bg-[#fe7743]'
            }`}
            disabled={selectedRowKeys.length === 0}
            onClick={() => {
              /* TODO: handle select action */
            }}
          >
            {t('INTERVIEW_REGISTRATION.SELECT')}
          </Button>
        </div>

        <InterviewFilterBar
          search={search}
          setSearch={setSearch}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          uniqueDates={uniqueDates}
          uniqueLevels={uniqueLevels}
          filteredCount={filteredData.length}
          t={t}
        />

        <div className='bg-white rounded-xl shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] p-0 overflow-x-auto'>
          <CustomTable
            columns={getColumns(t)}
            dataSource={filteredData}
            paginate={{
              table,
              setTable,
              total: filteredData.length,
              pageCount: Math.ceil(filteredData.length / table.take),
            }}
            disablePaginate={false}
            className='border-none min-w-[600px]'
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
              columnWidth: 48,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewRegistration;
