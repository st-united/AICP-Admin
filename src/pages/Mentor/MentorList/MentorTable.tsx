import { CalendarOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/Table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpandedRow } from './ExpandedMentorRow';
import Status from './Status';
import { Table } from '@app/components/atoms';
import { useGetMentor } from '@app/hooks';
import { GetMentorsParams, MentorColumns } from '@app/interface/user.interface';
import { formatDate } from '@app/utils';
import './MentorTable.scss';

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

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTable({
      page: pagination.current || 1,
      take: pagination.pageSize || 10,
    });
  };

  const columns: ColumnsType<MentorColumns> = [
    {
      title: t('MENTOR.FULLNAME'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render(_, record) {
        return (
          <>
            <span>{record.user.fullName}</span>
          </>
        );
      },
    },
    {
      title: t('MENTOR.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render(_, record) {
        return (
          <>
            <span>{record.user.email}</span>
          </>
        );
      },
    },
    {
      title: t('MENTOR.PHONENUMBER'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
      render(_, record) {
        return (
          <>
            <span>{record.user.phoneNumber}</span>
          </>
        );
      },
    },
    {
      title: t('MENTOR.INTERVIEW_COUNT'),
      dataIndex: 'completedCount',
      key: 'completedCount',
      width: 150,
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
        expandableRender={(record) => (
          <div className='px-6 py-1'>
            <ExpandedRow mentorId={record.id} />
          </div>
        )}
        expandedRowKeys={expandedRowKeys}
        setExpandedRowKeys={setExpandedRowKeys}
      />
    </div>
  );
};

export default MentorTable;
